# Expired Verification Link Handling

## Your Questions Answered

### ✅ Can users register again if the link is expired?
**No need to register again!** The account is already created when they first signed up. They just need to verify their email.

### ✅ Can users get a new verification email?
**Yes!** We've added a "Resend Verification Email" feature that sends a fresh verification link.

## How It Works Now

### Scenario 1: Link Expires After Signup

**What happens:**
1. User signs up successfully
2. Account is created in the database
3. Verification email is sent (valid for 24 hours)
4. User clicks link after it expires
5. They see error: `#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired`

**New behavior:**
1. App detects the error in URL automatically
2. Shows clear message: "Your verification link has expired. Please request a new one below."
3. User can click "Resend verification email" button
4. New verification link is sent immediately
5. User clicks new link and account is verified ✓

### Scenario 2: User Returns Later Without Verifying

**What happens:**
1. User signed up days/weeks ago
2. Never clicked verification link
3. Tries to sign in but can't (email not verified)

**New behavior:**
1. User opens Sign In modal
2. Enters their email
3. Clicks "Resend verification email" link below the form
4. New verification email is sent
5. User clicks link and can now sign in ✓

### Scenario 3: User Lost the Email

**What happens:**
1. User signed up
2. Can't find the verification email
3. Checks spam folder - nothing

**New behavior:**
1. User goes to Sign In
2. Enters their email address
3. Clicks "Resend verification email"
4. New email is sent
5. User verifies and signs in ✓

## Features Added

### 1. Automatic Error Detection
```typescript
// Detects expired link errors in URL
if (errorParam === 'access_denied' && errorDescription?.includes('expired')) {
  setError('Your verification link has expired. Please request a new one below.');
}
```

### 2. Resend on Success Screen
After signup, the success screen now has:
- "Got it!" button (primary action)
- "Resend Verification Email" button (secondary action)
- Visual feedback with spinning icon while sending
- Success message when email is sent

### 3. Resend on Sign In Screen
The sign-in form now has:
- "Resend verification email" link below the sign-in button
- Only shows on sign-in mode (not signup)
- Smart error messages:
  - Already verified → "This email is already verified. You can sign in now!"
  - Account not found → "No account found with this email. Please sign up first."

### 4. Smart Error Messages
The resend feature provides helpful feedback:
- ✓ "Verification email sent! Check your inbox." (success)
- ⚠️ "This email is already verified. You can sign in now!" (already done)
- ⚠️ "No account found with this email. Please sign up first." (doesn't exist)
- ❌ "Failed to resend: [specific error]" (other issues)

## User Flow Examples

### Example 1: Typical Expired Link Flow

```
1. User signs up
   → Success screen appears

2. User closes browser (forgets to verify)

3. 2 days later, user finds the email
   → Clicks link
   → Gets error page with expired message

4. User returns to app
   → Opens sign-in modal
   → Sees: "Your verification link has expired"
   → Enters email
   → Clicks "Resend verification email"

5. New email arrives in 10 seconds
   → User clicks new link
   → Email verified! ✓

6. User signs in successfully
```

### Example 2: Lost Email Flow

```
1. User signs up
   → Success screen appears
   → User thinks "I'll check email later"

2. User can't find the email
   → Checks inbox - not there
   → Checks spam - not there

3. User returns to app
   → Opens sign-in modal
   → Enters email address
   → Clicks "Resend verification email"

4. New email arrives
   → User clicks link
   → Email verified! ✓

5. User signs in successfully
```

### Example 3: Immediate Resend on Success Screen

```
1. User signs up
   → Success screen appears with email address

2. User checks email immediately
   → Nothing there (email delayed)

3. User clicks "Resend Verification Email" button
   → Spinner shows
   → Success message: "✓ Verification email sent!"

4. Email arrives (duplicate emails, but that's fine)
   → User clicks link
   → Email verified! ✓
```

## Technical Details

### Supabase `resend()` API

```typescript
const { error } = await supabase.auth.resend({
  type: 'signup',
  email: email,
});
```

**How it works:**
- Checks if user exists with that email
- Checks if email is already verified
- If not verified, sends new verification email
- New email has fresh 24-hour expiration
- Old links become invalid (security)

### Rate Limiting

Supabase has built-in rate limiting:
- Maximum 1 resend per 60 seconds per email
- Prevents abuse/spam
- User will see error if they try too frequently

### Security Considerations

1. **Old links are invalidated** when new link is sent
2. **Can't resend for someone else's email** (privacy)
3. **Rate limited** to prevent abuse
4. **Email must match an existing unverified account**

## Configuration

No configuration needed! The feature works out of the box with your existing Supabase setup.

### Optional: Customize Email Templates

To make resent emails clearer, you can customize the template in Supabase:

**Dashboard → Authentication → Email Templates → Confirm signup**

Add a note about resends:
```html
<p>Hi {{ .DisplayName }},</p>

<p>{% if .IsResend %}
  You requested a new verification link. Here it is:
{% else %}
  Thanks for signing up! Please confirm your email:
{% endif %}</p>

<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
```

*Note: Check Supabase docs for available template variables for resends.*

## Testing

### Test the Expired Link Flow

1. **Sign up with a test email**
   ```bash
   npm run dev
   ```

2. **Don't click the verification link**

3. **Manually create an expired link error:**
   - Go to: `http://localhost:5173/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired`
   - Modal should open with error message

4. **Test resend:**
   - Enter the email you used
   - Click "Resend verification email"
   - Check your email inbox
   - New verification email should arrive

5. **Click new link:**
   - Email should be verified
   - Sign in should work

### Test Resend on Success Screen

1. **Sign up with a test email**
2. **On success screen, click "Resend Verification Email"**
3. **Should see:** "✓ Verification email sent! Check your inbox."
4. **Check email:** Should receive verification email

### Test Resend on Sign-In Form

1. **Open sign-in modal**
2. **Enter an unverified email**
3. **Click "Resend verification email" link**
4. **Should see:** Success message or appropriate error

## Troubleshooting

### Issue: "Rate limit exceeded"

**Cause:** User clicked resend multiple times within 60 seconds

**Solution:** Wait 60 seconds and try again

### Issue: "No account found with this email"

**Cause:** User typed wrong email or never signed up

**Solution:** Double-check email spelling or sign up first

### Issue: "This email is already verified"

**Cause:** Email was already verified (common with expired links)

**Solution:** User can just sign in normally

### Issue: Email not arriving after resend

**Causes:**
1. Email in spam folder
2. Email provider blocking
3. SMTP configuration issue

**Solutions:**
1. Check spam/junk folder
2. Try different email provider (Gmail usually works)
3. Set up custom SMTP in Supabase (see EMAIL_VERIFICATION_SETUP.md)

## FAQ

### Q: Can users sign up again with the same email?
**A:** No, Supabase prevents duplicate accounts. They must use the resend feature to verify the existing account.

### Q: What if user never receives ANY verification emails?
**A:**
1. Check spam folder
2. Try resending
3. Check Supabase logs for email delivery errors
4. Consider setting up custom SMTP (more reliable than default)

### Q: How many times can a user resend?
**A:** Unlimited, but rate-limited to once per 60 seconds per email.

### Q: Do old verification links still work after resending?
**A:** No, old links are invalidated when a new one is sent (security feature).

### Q: Can admin manually verify a user's email?
**A:** Yes, in Supabase Dashboard:
1. Go to Authentication → Users
2. Find the user
3. Click on them
4. Toggle "Email Confirmed" to ON

### Q: What if the verification link expires again?
**A:** User can resend as many times as needed. Each resend gives a fresh 24-hour window.

## Production Recommendations

1. **Set up custom SMTP** for better email deliverability
2. **Monitor resend rates** to detect potential abuse
3. **Customize email templates** with branding
4. **Add support contact** in error messages
5. **Test with multiple email providers** (Gmail, Outlook, Yahoo, etc.)

## Summary

Users **never need to register again** if their verification link expires. They can:
1. Use the "Resend verification email" button on the success screen
2. Use the "Resend verification email" link on the sign-in form
3. Get a fresh verification link within seconds
4. Repeat as many times as needed

The expired link error is now handled gracefully with clear guidance! 🎉
