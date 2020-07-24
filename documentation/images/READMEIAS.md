### Setup your own IAS tenant for authentication

1. Request [IAS tenant ID](https://tenants.ias.only.sap/)
2. Follow [SAP CF subaccount trust configuration](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/7c6aa87459764b179aeccadccd4f91f3.html#loioaedb8eed952b41c4b87c50b92bf651e4)
3. Follow the steps under “Procedure to setup trust between IAS and BizX tenant” in the [document](https://confluence.successfactors.com/pages/viewpage.action?pageId=255365887) to set up SSO. 
4. Add metadata in tenant.
5. Add the required SF user, sfadmin in you tenant. Click on 'Add User' in <tenant URl>/admin/#/users
   Enter the details of the user. Set the initial password for the user from Authentication tab-> password details -> set initial password. 
6. From the applications tab of your tenant, set the 'Subject Name Identifier' as 'Employee number' for your application and as 'Login Name' for your SF instance. 