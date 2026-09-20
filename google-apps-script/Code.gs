/**
 * Google Apps Script Web App Code
 * Sender: ece97225@gmail.com
 * 
 * Deployment Instructions:
 * 1. Open https://script.google.com while logged into ece97225@gmail.com
 * 2. Paste this code into Code.gs
 * 3. Click 'Deploy' -> 'New deployment'
 * 4. Select type: 'Web app'
 * 5. Execute as: 'Me (ece97225@gmail.com)'
 * 6. Who has access: 'Anyone'
 * 7. Copy the Web App URL and configure it in your backend environment variable (APPS_SCRIPT_URL)
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === "send_otp") {
      const email = data.email;
      const otp = data.otp;
      const appName = data.appName || "ECE Quest Pro";

      if (!email || !otp) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "Missing recipient email or OTP code"
        })).setMimeType(ContentService.MimeType.JSON);
      }

      const subject = `Your Verification Code for ${appName}: ${otp}`;
      
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; background-color: #060B13; color: #F8FAFC; border: 1px solid #1E3452; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0F1A2A, #132238); padding: 24px; text-align: center; border-bottom: 1px solid #1E3452;">
            <div style="display: inline-block; background: #00E5FF; color: #060B13; font-weight: 800; font-size: 14px; padding: 4px 10px; border-radius: 4px; margin-bottom: 8px;">ECE QUEST PRO</div>
            <h2 style="margin: 0; color: #FFFFFF; font-size: 20px;">Email Verification</h2>
          </div>
          <div style="padding: 28px 24px;">
            <p style="color: #94A3B8; font-size: 14px; margin-top: 0;">Use the 6-digit one-time verification code below to complete your registration:</p>
            <div style="background: #0B1320; border: 1px dashed #00E5FF; border-radius: 8px; padding: 18px; text-align: center; margin: 24px 0;">
              <span style="font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #00E5FF;">${otp}</span>
            </div>
            <p style="color: #64748B; font-size: 13px; line-height: 1.5;">
              • This code expires in <b>10 minutes</b>.<br>
              • If you did not request this registration code, please ignore this email.
            </p>
          </div>
          <div style="background: #0B1320; padding: 14px; text-align: center; border-top: 1px solid #1E3452; color: #64748B; font-size: 12px;">
            © ${new Date().getFullYear()} ECE Quest Pro • Trinity College of Engineering and Technology
          </div>
        </div>
      `;

      // Send through GmailApp
      GmailApp.sendEmail(email, subject, `Your ECE Quest Pro verification code is: ${otp}. It will expire in 10 minutes.`, {
        name: "ECE Quest Pro",
        htmlBody: htmlBody
      });

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "OTP sent successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Invalid action"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
