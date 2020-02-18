---
id: user-profile-and-api-token
title: User Profile & API Token
---
The ARGO User Profile page displays important user information including:
- which email you have logged into the ARGO platform with
- what your ARGO Member permission are
- API Key management

To get to your User Profile, click the initial icon in the top right corner and select Profile and Token.  
## API Key
Your authentication API Key uniquely identifies you, and your permissions, to all ARGO Data Platform applications, for example when using the Song or Score clients for data submission.

You can get your authentication API Key from the [User Profile](https://platform.icgc-argo.org/user) > API Key section.  
![Profile API Key](../img/data-access-user-profile-api-key.png)
Some important things to note about your API Key:
- ARGO API keys have a duration **30 days**.
- This is a _personal key_.  **Never** share your user credentials with anyone else.
- If you suspect that your API-key security has been compromised, simple regenerate it from this page.  All former API Keys will be revoked when you regenerate a token.

## Member Permissions
Member permissions are assigned based the role that has been granted to you in a specific program, the type of program you are a member of, or your application for access to controlled data.
![ARGO Member Permissions](../img\data-access-user-profile-program-access.png)

### DACO Access
DACO access is required to download controlled data that does not belong to a program you are a member of.  If you have been granted DACO access, you should see a green checkmark.  

If you do not have DACO access, please see the instructions for [apply to controlled access data]().
### Program Permission
Under "My Memberships", you will see a list of Programs that you have been granted access to for the purpose of data submission or management, along with your  [role](/docs/data-access) in that program.
