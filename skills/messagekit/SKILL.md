# MessageKit Skill

Use MessageKit to send Telegram messages from agents through the MessageKit MCP tool or CLI fallback. This skill provides a reliable way to communicate via Telegram, with automatic fallback between MCP and CLI methods.

## When to Use

**Use this skill when:**
- User asks to send a Telegram message to someone
- User wants to notify someone via Telegram
- User mentions "send a message", "telegram", or "messagekit"
- User wants to interact with the MessageKit toolset
- User needs to verify MessageKit is working properly
- User wants to choose between MCP and CLI workflows
- User asks about sending notifications or alerts via Telegram

**Examples of user requests:**
- "Send a Telegram message to John saying the meeting is at 3pm"
- "Notify the team via Telegram that the deployment is complete"
- "Use messagekit to send a reminder to +1234567890"
- "Check if messagekit is configured correctly"
- "Should I use the MCP tool or CLI for sending Telegram messages?"

## How It Works

MessageKit provides two ways to send Telegram messages:

### 1. MCP Tool (Preferred)
The MCP tool is the preferred method when available. It's faster and more reliable than the CLI fallback.

**Tool name:** `Messagekit_telegram`

**Parameters:**
- `chatId` (required): The Telegram chat ID or phone number
- `message` (required): The message text to send

**Example usage:**
```
Messagekit_telegram(chatId: "123456789", message: "Hello from MessageKit!")
```

**With phone number:**
```
Messagekit_telegram(chatId: "+1234567890", message: "Your order has been shipped!")
```

### 2. CLI Fallback
When the MCP tool is unavailable or not configured, use the CLI as a fallback.

**Command:**
```bash
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id CHAT_ID --message "YOUR_MESSAGE"
```

**Example:**
```bash
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "+1234567890" --message "Deployment complete!"
```

**Important notes:**
- The CLI requires Node.js and npm to be installed
- First run may take a moment to download the package
- Use quotes around messages with spaces

## Configuration

### Environment Variable
MessageKit requires a Telegram bot token set as an environment variable:

```bash
export TELEGRAM_BOT_TOKEN="your_bot_token_here"
```

### Setting Up the Bot Token
1. **Get a bot token:** Contact @BotFather on Telegram and create a new bot
2. **Set the environment variable:** Add the token to your shell profile or `.env` file
3. **Verify:** Run a test message to confirm it works

### Common Configuration Issues
- **Bot token not found:** Ensure `TELEGRAM_BOT_TOKEN` is exported in your current shell
- **Permission denied:** Check that the bot token is valid and not revoked
- **Chat ID not found:** Verify the chat ID or phone number is correct

## Verification

### Manual Verification Steps

**1. Check MCP Server Status (if using MCP):**
```bash
# Check if MCP server is running
ps aux | grep messagekit
```

**2. Test CLI Directly:**
```bash
# Send a test message
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "YOUR_CHAT_ID" --message "Test message"
```

**3. Verify Environment Variable:**
```bash
# Check if token is set
echo $TELEGRAM_BOT_TOKEN

# If empty, set it
export TELEGRAM_BOT_TOKEN="your_token_here"
```

**4. Test with a Simple Message:**
```bash
# Use a known chat ID (your own Telegram chat)
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "YOUR_OWN_CHAT_ID" --message "Hello!"
```

### Troubleshooting Verification Issues
- **"Command not found":** Ensure Node.js and npm are installed
- **"Token not set":** Export the environment variable in your current shell
- **"Invalid chat ID":** Verify the chat ID format (numbers only, no spaces)
- **"Bot blocked":** Ensure the bot is allowed to message the chat

## Workflow Selection

### Decision Guide

**Use MCP when:**
- MCP server is running and configured
- You need faster message delivery
- You're in an environment that supports MCP tools
- You want automatic error handling

**Use CLI when:**
- MCP server is unavailable or not configured
- You need a quick fallback solution
- You're running in a script or automation
- You want to test MessageKit without MCP setup

### Comparison Table

| Feature | MCP Tool | CLI Fallback |
|---------|----------|--------------|
| Speed | Faster | Slower (initial load) |
| Setup | Requires MCP server | Just needs npm |
| Error handling | Automatic | Manual |
| Dependencies | MCP server | Node.js + npm |
| Reliability | High | High (with fallback) |

### Best Practices
1. **Try MCP first:** Always attempt to use the MCP tool when available
2. **Have CLI ready:** Keep the CLI command as a backup
3. **Test your setup:** Verify configuration before sending important messages
4. **Check chat IDs:** Ensure you have the correct chat ID or phone number
5. **Handle errors:** Implement proper error handling for failed messages

## Common Use Cases

### 1. Sending Notifications
```bash
# Deploy complete notification
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "TEAM_CHAT_ID" --message "Deployment to production complete!"
```

### 2. Alerting Team Members
```bash
# Send alert to specific person
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "+1234567890" --message "Critical issue detected in production"
```

### 3. Automated Reminders
```bash
# Daily standup reminder
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "TEAM_CHAT_ID" --message "Time for daily standup in 15 minutes!"
```

### 4. Status Updates
```bash
# Build status update
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "BUILD_CHAT_ID" --message "Build #1234 succeeded - all tests passing"
```

## Error Handling

### Common Errors and Solutions

**1. "TELEGRAM_BOT_TOKEN not set"**
```bash
# Solution: Set the environment variable
export TELEGRAM_BOT_TOKEN="your_token_here"
```

**2. "Invalid chat ID"**
```bash
# Solution: Verify the chat ID format
# - Use numbers only: "123456789"
# - For phone numbers: "+1234567890"
# - No spaces or special characters
```

**3. "Bot cannot send messages to this chat"**
```bash
# Solution: Ensure the bot is allowed
# - User must start a conversation with the bot first
# - Bot must be added to group chats
```

**4. "Network error"**
```bash
# Solution: Check internet connection
# - Try again in a moment
# - Verify Telegram API is accessible
```

## Quick Reference

### MCP Tool Call
```
Messagekit_telegram(chatId: "CHAT_ID", message: "MESSAGE")
```

### CLI Command
```bash
npx -y @anand.dev.ai/messagekit-mcp telegram --chat-id "CHAT_ID" --message "MESSAGE"
```

### Environment Variable
```bash
export TELEGRAM_BOT_TOKEN="your_bot_token"
```

## Notes

- Always prefer MCP when available for better performance
- CLI is a reliable fallback but has initial load overhead
- Both methods require a valid Telegram bot token
- Test your setup with a simple message before sending important communications
- Keep your bot token secure and never commit it to version control