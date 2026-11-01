import { Inngest } from "inngest";
import User from "../models/User.js";
import Connection from "../models/Connection.js";
import sendEmail from "../configs/nodemailer.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "demogram" })

const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk', triggers: { event: 'clerk/user.created' } },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        
        if (!email_addresses || email_addresses.length === 0) {
            throw new Error('No email addresses provided');
        }
        
        let username = email_addresses[0].email_address.split('@')[0];
        
        // Generate unique username
        let user = await User.findOne({ username });
        let attempts = 0;
        while (user && attempts < 10) {
            username = username + Math.floor(Math.random() * 10000);
            user = await User.findOne({ username });
            attempts++;
        }
        
        if (user) {
            throw new Error('Could not generate unique username');
        }

        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            full_name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
            profile_picture: image_url,
            username
        }
        await User.create(userData);

    })

const syncUserUpdate = inngest.createFunction(
    { id: 'update-user-from-clerk', triggers: { event: 'clerk/user.updated' } },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        const updateUserData = {
            email: email_addresses?.[0]?.email_address,
            full_name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
            profile_picture: image_url
        }
        await User.findByIdAndUpdate(id, updateUserData);


    })

const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk', triggers: { event: 'clerk/user.delete' } },
    async ({ event }) => {
        const { id } = event.data;
        await User.findByIdAndDelete(id);
    })

const sendNewConnectionRequestReminder = inngest.createFunction(
    { id: 'send-new-connection-request-reminder', triggers: { event: 'app/connection-request' } },
    async ({ event, step }) => {
        const { connectionId } = event.data;
        await step.run('send-connection-request-email', async () => {
            const connection = await Connection.findById(connectionId).populate('from_user_id').populate('to_user_id');
            
            if (!connection || !connection.from_user_id || !connection.to_user_id) {
                return { message: 'Connection or users not found' };
            }
            
            const subject = `New Connection Request`;
            const body = `
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 550px; border-collapse: collapse; background-color: #000000;">
          <tr>
            <td style="padding: 32px 24px;">
              <!-- Logo / Brand Header -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td>
                    <span style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Demogram</span>
                  </td>
                </tr>
              </table>
              
              <!-- Greeting -->
              <h2 style="font-size: 22px; font-weight: 600; line-height: 1.4; margin-top: 0; margin-bottom: 16px; color: #ffffff;">
                Hi ${connection.to_user_id.full_name},
              </h2>
              
              <!-- Body Content -->
              <p style="font-size: 16px; line-height: 1.7; margin-top: 0; margin-bottom: 32px; color: #a1a1aa;">
                <strong style="color: #ffffff;">${connection.from_user_id.full_name}</strong> has sent you a connection request on Demogram. Click the button below to view the request and connect with them.
              </p>
              
              <!-- Call to Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 40px;">
                <tr>
                  <td align="center" style="background-color: #ffffff; border-radius: 8px;">
                    <a href="${process.env.FRONTEND_URL}/connections" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 15px; font-weight: 600; color: #000000; text-decoration: none; background-color: #ffffff; border-radius: 8px;">
                      View Connection Request
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Divider Line -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="border-top: 1px solid #27272a; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>
              
              <!-- Sign-off -->
              <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #71717a;">
                Best regards,<br/>
                <span style="font-weight: 500; color: #a1a1aa;">The Demogram Team</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
            `;
            await sendEmail({ to: connection.to_user_id.email, subject, body });
        })


        const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await step.sleepUntil('wait-for-24-hours', in24Hours);
        await step.run('send-connection-request-reminder', async () => {
            const connection = await Connection.findById(connectionId).populate('from_user_id').populate('to_user_id');

            if (!connection || !connection.from_user_id || !connection.to_user_id) {
                return { message: 'Connection or users not found' };
            }

            if (connection.status === 'accepted') {
                return { message: 'Connection request already accepted, no reminder sent.' };
            }

            const subject = `New Connection Request Reminder`;
            const body = `
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 550px; border-collapse: collapse; background-color: #000000;">
          <tr>
            <td style="padding: 32px 24px;">
              <!-- Logo / Brand Header -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td>
                    <span style="font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Demogram</span>
                  </td>
                </tr>
              </table>
              
              <!-- Greeting -->
              <h2 style="font-size: 22px; font-weight: 600; line-height: 1.4; margin-top: 0; margin-bottom: 16px; color: #ffffff;">
                Hi ${connection.to_user_id.full_name},
              </h2>
              
              <!-- Body Content -->
              <p style="font-size: 16px; line-height: 1.7; margin-top: 0; margin-bottom: 32px; color: #a1a1aa;">
                <strong style="color: #ffffff;">${connection.from_user_id.full_name}</strong> has sent you a connection request on Demogram. Click the button below to view the request and connect with them.
              </p>
              
              <!-- Call to Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 40px;">
                <tr>
                  <td align="center" style="background-color: #ffffff; border-radius: 8px;">
                    <a href="${process.env.FRONTEND_URL}/connections" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 15px; font-weight: 600; color: #000000; text-decoration: none; background-color: #ffffff; border-radius: 8px;">
                      View Connection Request
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Divider Line -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="border-top: 1px solid #27272a; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>
              
              <!-- Sign-off -->
              <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #71717a;">
                Best regards,<br/>
                <span style="font-weight: 500; color: #a1a1aa;">The Demogram Team</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
            `;

            await sendEmail({ to: connection.to_user_id.email, subject, body });
        })

        return { message: 'Connection request reminder sent after 24 hours.' };
    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation, syncUserUpdate, syncUserDeletion, sendNewConnectionRequestReminder
];