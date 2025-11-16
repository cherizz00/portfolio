# 🚀 Quick EmailJS Setup (5 Minutes)

## What You Need (3 Things):

1. **Public Key** - From EmailJS Account → General
2. **Service ID** - From Email Services (looks like `service_xxxxx`)
3. **Template ID** - From Email Templates (looks like `template_xxxxx`)

## Steps:

### 1️⃣ Sign Up
- Go to https://www.emailjs.com/
- Sign up (free - 200 emails/month)

### 2️⃣ Create Service
- Email Services → Add New Service
- Connect Gmail (or your email)
- **Copy Service ID**

### 3️⃣ Create Template
- Email Templates → Create New Template
- Set "To Email" = your email (cherrybangari583@gmail.com)
- Use variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- **Copy Template ID**

### 4️⃣ Get Public Key
- Account → General → **Copy Public Key**

### 5️⃣ Update Code
Open `js/script.js` and replace:

**Line 96:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // ← Replace with your Public Key
```

**Line 117:**
```javascript
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
//         ↑ Replace this    ↑ Replace this
```

### 6️⃣ Deploy
```bash
git add .
git commit -m "Configure EmailJS"
git push
```

**Done!** 🎉 Your form will now send emails!

---

📖 **Full guide:** See `EMAILJS_SETUP.md` for detailed instructions

