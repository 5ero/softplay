<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #ea580c;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> {{ $name }}</p>
            <p><strong>Email:</strong> {{ $email }}</p>
            <p><strong>Phone:</strong> {{ $phone }}</p>
        </div>
        
        <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px; white-space: pre-wrap;">{{ $message }}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        
        <p style="color: #64748b; font-size: 14px;">
            This email was sent from the Funtime Softplay contact form.
        </p>
    </div>
</body>
</html>
