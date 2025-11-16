# EmailJS Setup Guide - Contact Form Integration

This guide will help you set up EmailJS to make your contact form work. EmailJS is a free service (200 emails/month) that sends emails directly from your website without a backend server.

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Sign up with your email or GitHub account (recommended)
4. Verify your email if required

## Step 2: Create an Email Service

1. After logging in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended - easiest)
   - **Outlook**
   - **Yahoo**
   - Or any other provider
4. Click **"Connect Account"** and authorize EmailJS to send emails
5. Give your service a name (e.g., "Portfolio Contact")
6. Click **"Create Service"**

**📝 Note:** You'll see a **Service ID** (looks like: `service_xxxxxxx`). Copy this - you'll need it!

## Step 3: Create an Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Choose a template or start from scratch
4. Configure the template:

   **Subject Line:**
   ```
   New Contact Form Message from {{from_name}}
   ```

   **Content:**
   ```
   You have a new message from your portfolio contact form:
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```

5. **From Name:** Your name (e.g., "Portfolio Contact Form")
6. **To Email:** Your email address (e.g., cherrybangari583@gmail.com)
7. Click **"Save"**

**📝 Note:** You'll see a **Template ID** (looks like: `template_xxxxxxx`). Copy this too!

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the left sidebar
2. Find **"Public Key"** (looks like: `xxxxxxxxxxxxx`)
3. Copy this key

## Step 5: Update Your Code

Now you need to replace the placeholders in `js/script.js`:

1. Open `js/script.js`
2. Find line 96 and replace `YOUR_PUBLIC_KEY` with your Public Key:
   ```javascript
   emailjs.init("your_actual_public_key_here");
   ```

3. Find line 117 and replace:
   - `YOUR_SERVICE_ID` with your Service ID
   - `YOUR_TEMPLATE_ID` with your Template ID
   
   Example:
   ```javascript
   emailjs.send("service_abc123", "template_xyz789", formData)
   ```

## Step 6: Test Your Form

1. Save all files
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add EmailJS integration for contact form"
   git push
   ```
3. Wait for Vercel to redeploy (usually automatic)
4. Visit your live site and test the contact form
5. Check your email inbox for the test message!

## Troubleshooting

### Form not sending?
- ✅ Check browser console (F12) for errors
- ✅ Verify all three IDs are correct (Public Key, Service ID, Template ID)
- ✅ Make sure EmailJS service is connected and active
- ✅ Check EmailJS dashboard for error logs

### Not receiving emails?
- ✅ Check spam/junk folder
- ✅ Verify "To Email" in template is correct
- ✅ Check EmailJS dashboard → "Activity" for delivery status

### Still having issues?
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Free tier allows 200 emails/month
- Upgrade to paid plan if you need more

## Security Note

Your Public Key is safe to expose in frontend code. EmailJS uses it to identify your account, but it doesn't give access to your account settings.

---

**Quick Reference:**
- EmailJS Dashboard: https://dashboard.emailjs.com/
- Your Public Key: Account → General
- Service ID: Email Services → Your Service
- Template ID: Email Templates → Your Template

