---
id: user-profile-and-api-token
title: User Profile & API Token
platform_key: DOCS_API_TOKEN
---

The ARGO User Profile page displays important user information including:

- the email address associated with your ARGO Platform user
- your ARGO member permissions
- API Token management

To get to your User Profile, click the icon in the top right corner and select **Profile and Token**.

## API Token

Your authentication API Token uniquely identifies you and your permissions. These permissions apply to all ARGO Data Platform applications, for example when using the Song or Score clients for molecular data submission.

You can get your authentication API Token from the [User Profile](https://platform.icgc-argo.org/user) > API Token section.  
![Profile API Token](/assets/data-access/user-profile-api-token.png)
Some important things to note about your API Token:

- ARGO API Tokens have a duration of **30 days**.
- This is a _personal key_. **Never** share your user credentials with anyone else.
- If you suspect that your API Token security has been compromised, simply regenerate it from this page. All former API Tokens will be revoked when you regenerate a token.

## Permissions

Permissions are assigned based on the role that has been granted to you in a specific program, the type of program you are a member of, and your application for access to controlled data.

![ARGO Member Permissions](/assets/data-access/user-profile-program-access.png)

### DACO Access

DACO access is required to download controlled data from any program you have approval for. If you have been granted DACO access, you should see a green "DACO Approved" checkmark.

If you do not have DACO access, please see the instructions for [applying to controlled access data](/docs/data-access/data-access).

### Program Permission

Under "My Memberships", you will see a list of Programs that you have been granted access to for the purpose of data submission or management, along with your [role and permissions](/docs/submission/managing-program-access#user-roles-and-permissions) for those programs. If you are not part of a program that is submitting data to the ARGO Data Platform, then this section will not list any Programs.
