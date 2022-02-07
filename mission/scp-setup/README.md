# Set up a SAP Business Technology Platform Account using Booster

## Introduction

For running this SAP SuccessFactors extension tutorial, you will need the following services in your SAP Business Technology Platform (SAP BTP) account.

* SAP Business Application Studio
* Event Mesh
* Enterprise Messaging Hub
* Cloud Foundry Runtime
* SAP HANA Cloud service
* SAP Launchpad
* SAP Continuous Integration & Delivery service (optional)

The entitlement differs for the pricing option of your account:

* **Consumption-based SAP BTP Account:** 
No entitlement necessary. Be sure that you have enough credits to run the services.

* **Subscription-based SAP BTP Account:** 
You have to create entitlements for the services above - [See Entitlements and Quotas](https://help.sap.com/viewer/df50977d8bfa4c9a8a063ddb37113c43/Cloud/en-US/38ecf59cdda64150a102cfaa62d5faab.html#loio363f0f68f9704830ac65c87a2562559b).


To check how much these services would cost, use the [SAP BTP Estimator Tool](https://www.sap.com/products/cloud-platform/pricing/estimator-tool.html?blueprintId=a0ad3bc5-4fcb-4008-b109-bd8f70634d6c)


You can either set up each service individually or use a dedicated booster that will automate the setup for you. To simplify the setup process, SAP has introduced Boosters. Boosters are a collection of wizards that provides functionalities for specific scenarios to automate and speed up the installation and configuration process of a SAP BTP sub-account. This also includes the user management with the mapping of the respective Administrator and Developer roles.

Before running the booster, please check for which regions and infrastructures the services are available. The booster is not able to check this in advance, so it will fail when you select a region where a service is not available.[See SAP Discovery Center Service Catalog](https://help.sap.com/doc/aa1ccd10da6c4337aa737df2ead1855b/Cloud/en-US/3b642f68227b4b1398d2ce1a5351389a.html).


**Persona:** Cloud Administrator (SAP BTP) 

**Abbreviation:** SAP Business Technology Platform = SAP BTP

## Step-by-step

### Prepare a SAP BTP sub-account using Boosters for developing extension applications
 
1. Open your global SAP BTP account cockpit.
   - Select **Boosters** in the menu.
   - Select the Booster **Prepare an Account for Developing Extension Applications**
   
   ![Booster](./images/booster-01.png)

2. Read the **Overview** of the **Prepare an Account for Developing Extension Application** booster.

   ![Booster](./images/booster-02.png)
 
3. Choose **Components** to get an overview of the services and components that the booster will set up for you. Press **Start** to start the booster.

   ![Booster](./images/booster-03.png)

4. The booster checks whether the prerequisites for completing the booster are met. You will be able to continue only if all the prerequisites are met. Otherwise, you will get an error.

   ![Booster](./images/booster-04.png)

5. Now let us setup your BTP Subaccount, To learn more about global and subaccounts, refer to this [Account Model help page](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/8ed4a705efa0431b910056c0acdbf377.html)
   
   - You find the list of the Services that will be activated by the Booster. For this tutorial, there are also optional services like : **Continuous Integration & Delivery** service, if you don't want to use these services, you can remove this service before running the booster. 
   - The **Extension Center**, **Extension Factory, serverless runtime** service, **Application Logging**, **Application Autoscaler service** and **SAP Cloud Transport Management service** are not needed for this tutorial 
   - Select the **Remove** icon to remove them. This means they will not be set up when the Booster is completed.
   - We will need the **SAP Launchpad** service to run the sample HTML5 applications which use 'Managed Application Router', refer to [SAP Help - Developing HTML5 Applications in the Cloud Foundry Environment](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/11d77aa154f64c2e83cc9652a78bb985.html), so do not remove the **SAP Launchpad Service**.
   - Depending on if you have a **Cloud credit** based account or a **Subscription** account, below screenshot might vary accordingly: 

     ![Booster](./images/booster-05.png)

   - If you use a subscription based SAP BTP accounts you have to increase quota for Cloud Foundry Runtime to 3.

     ![Booster](./images/booster-05aa.png)

6. In the Setup Subaccount step,
   - For the field **Subaccount Name**, enter a meaningful subaccount name, for example a name which denotes your project name.
   - Select your **Provider**
   - Select the **Region**
   - You can leave the default unique value suggested for **Subdomain**
   - Enter a meaningful name for the field **Org Name**, for example : SFSFTutorial, Orgname shoud not have '_' or '-' in the name. 
   - Enter a space name, for example, 'dev' or 'test' or 'prod'.
   - Press **Next**
  
   ![Booster](./images/booster-06.png)

7. In the **Add Users** dialog,
   - Enter the User ID (mail address) of all users with Cloud Administrator role.
   - Enter the User ID (mail address) of all users with Cloud Application Developer role.
   - Choose **Next**
   
     ![Booster](./images/booster-07.png)

8. Review your settings and press **Finish** to complete the Booster.
   
   ![Booster](./images/booster-08.png)

9.  Check the **Progress** window, tasks should become green.
   
    ![Booster](./images/booster-09.png)

10. If the Booster is completed successfully, navigate to your new subaccount.

    ![Booster](./images/booster-10.png)

11. Check the roles of your subaccount, Select **Security**, **Role Collections** and you will find the **Extension_App_Administrator** and the **Extension_App_Developer** role collections. If you want to add additional users to work on this tutorial/subaccount, you have to assign one of those role collections.

    ![Booster](./images/booster-11.png)

12. Go back to the Overview of your BTP subaccount.

13. Click **Services** and then choose **Instances and Subscriptions**. Select the tab **Subscriptions**, You should see that the following services have been subscribed:

    * SAP Business Application Studio
    * SAP Event Mesh
    * Continuous Integration & Delivery (only when selected in the booster)
    

    ![Booster](./images/booster-12.png)

### Configure Entitlements to SAP HANA Cloud service


Execute the following steps to [Configure Entitlements to SAP HANA Cloud service](https://github.com/SAP-samples/cloud-extension-ecc-business-process/tree/mission/mission/scp-setup#configure-entitlements-to-sap-hana-service).
   

### B: Create a SAP HANA Cloud Instance

For this tutorial, a SAP HANA Cloud service Instance is necessary for persistance. Execute the following steps to [Create a SAP HANA Cloud service instance](https://github.com/SAP-samples/cloud-extension-ecc-business-process/tree/mission/mission/scp-setup#b-create-a-sap-hana-cloud-service-instance).

