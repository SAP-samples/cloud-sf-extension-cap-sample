# Creating a CI/CD pipeline for the cloud application

## Introduction

In this section, we describe steps how to configure and run predefined continuous integration and delivery (CI/CD) pipelines that automatically test, build, and deploy your code changes to speed up your development and delivery cycles.

**Persona:** Cloud Administrator / Cloud Application Developer
**Abbreviation:** SAP Business Technology Platform = SAP BTP


## Step-by-Step


### Create GitHub Repository

This step describes how to create a GitHub repository in which you can store the source code of your project. You need to have a user in the public GitHub to execute the steps below.

1. Open your GitHub home page.
2. Choose *New* in the 'Repositories' tab to create a new repository.

   ![Create GitHub Repo](./images/newRepository.png)
   
3. Enter the name of the repository. For example, **extendUI**. Do not select the checkbox **Intialize this repository with a README**.
4. Choose create repository.

    ![Create GitHub Repo](./images/createGitRepo.png)

5. Copy the GitHub URL of the newly created Git repository.

   ![Copy GitHub URL](./images/copyGitHubURL.png)
   

   
### Generating OAuth Token

1. As the public Git hub announced deprecation of Basic Authentication, we have described steps how to login with the Access tokens to the Git.
2. Refer to the public Git Hub link and create a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
3. You can use these Access tokens when you want to use Git commands instead of giving Git password.

### Add Git repository to CAP project

1. Login to your SAP BTP global account. 
2. Goto your subaccount and choose **Instances andd Subscriptions**. 
3. In the **Subscriptions** section search for **SAP Business Application Studio** and choose **Go to Application**. 
   
   ![Open Biz App Studio](./images/openBizAppStudio.png) 
   
4. When prompted log into the Application using your custom Identity Provider credentials.
5. Open the previously created workspace with the CAP application.
6. **Only for SAP SuccessFactors as backend system**: Open **mta.yaml** file. 
   -  Edit the **sap-successfactors-extensibility** service from **type: org.cloudfoundry.managed-service** to **type: org.cloudfoundry.existing-service**. When we create a CI/CD pipeline with deployment of application, Currently the update of "SAP SuccessFactors Extensibility service" fails. So we reuse the existing service instance which was created while [Deploying an extension application](../extension-app/README.md#build-and-deploy). 
   
   >**Note**: Skip this Step 6 if your backend system is not an SAP SuccessFactors scenario.
 
   ![Open Terminal](./images/editmta.png)
   
7. Open a new terminal and navigate to project root folder.

   ![Open Terminal](./images/openTerminal.png) 
   
8. Enter your email address and user name. You can use the email address which you have used to register the GitHub account.
   ```
   git config --global user.email "you@example.com"
   git config --global user.name "Your Name"
   ```
9. Now we are initializing a Git repository which can be used to convert an existing, unversioned project to a Git repository or initialize a new, empty repository. To use  other Git commands, you need an initialized repository, so this is usually the first command you'll run in a new project. Use the following commands:

	```
    git init
    git add .
    git commit -m "Push project content to GitHub"
    ```
   ![Git Commit](./images/commitProject.png)
    
10. Now take the copied GitHub Repository URL which you created and copied in step 5 of 'Creating GitHub Repository' and add this URL pointing as the remote repository.

   ```
   git remote add origin <copied Git repository url.git>
   ```
    
11. Push the commit with project contents to the default branch of this GitHub repository. Check in your GitHub repository if your default branch is master or main.
    
   ```
   git push -u origin main
   ```
    
12. When prompted, enter your GitHub username and Password (or token).
    
    ![Git Commit](./images/gitPushRepository.png)



  
### Set up Continuous Integration and Delivery Credentials

1. In your subaccount in the SAP BTP cockpit, choose **Instances and Subscriptions**.
2. Search for **Continuous Integration & Delivery** and select **Go to Application**.

   ![Git Commit](./images/openCICDService.png)

4. Login to the Continuous Integration & Delivery application using the company identity provider account credentials.
5. In the next step, we will configure credentials for connecting SAP Continuous Integration and Delivery to other the cloud accounts.
Let us create Credentials to connect to GitHub to clone the sources. This step is only needed if your GitHub repository is private else you can skip this step.
  - Choose the **Credentials** tab and then choose **+**. For the user name, enter your Github user name. 
  - For **Type**, select **Basic Authentication**.
  - In the **Username** field enter your GitHub user.
  - For **Password**, use the personal access token which you created in your GitHub account in the previous section. 

     ![Git Commit](./images/gitCredentials.png)
     
6. In the Credentials tab, choose **+** (Create Credentials) to configure credentials of a SAP BTP user, who has the appropriate permissions. The user must have the Space Developer role and also be a member of the specified Cloud Foundry organization and space. 
We recommend using a technical user. However, you can use also use your cloud credentials. 
  - Enter a name for the cloud credentials, ex: cloud-credentials
  - **Type**: Choose **Basic Authentication**
  - In the **Username** field enter your SAP BTP email id
  - In the **Password** field enter your SAP BTP user password

   ![Cloud Credentials](./images/cloudCredentials.png)

### Set up Continuous Integration & Delivery (CI/CD) Job
  
1. Go back to the SAP Continous Integration & Delivery service. 
2. In the adminstration console select **Repositories**. Choose the **+** icon to create a new repository.
3. In the **Add Repository** screen enter the following values:
   * In the **Name** field set the name for the repository for example: cloud-extension-sf-mission
   * In the **Clone URL** set the clone URL of your GitHub repository
   * In the **Credentials** field choose the credentials for your GitHub repository which you created in step 5 in the first section  - it is necessary for private GitHub repositories.
  
   ![create repository](./images/repository1.png)
   
4. At the WEBHOOK EVENT RECEIVER section add the following
   
   * In the **Type** field chosse GitHub
   * In the **Webhook Credential** field choose **\Create Credentials\>**
   * Keep the **State** field on
  
   ![add credentials](./images/webhookCredentials01.png)


5. In the **Create Credential** window do the following
   
   * Enter a name for the credentials
   * Generate a secret
   * Copy the secret into a text editor of your choice.
   * Press Create
  
   ![add credentials](./images/webhookCredentials.png)

6. Press *Add* to save the repository 
   
   ![add credentials](./images/repositoryAdd.png)


7. The Webhook Creation pop-up appears. It provides you with the data you need to define a webhook in GitHub. Copy the **Payload URL** into a text editor of your choice.
   
     ![copy payload URL](./images/webhookdata.png)
    
8. Open your GitHub repository and choose **Settings** --> **Webhooks** --> **Add webhook**.

    ![add Web Hook](./images/addWebHook.png)
    
9.  For the **Payload URL** and **Secret**, paste the values of the Payload URL and Secret fields you copied and saved in step 5. For **Content Type** field, select **application/json** and configure the job to be triggered for every **Push** event and choose **Add Webhook**. Now, any new push request to this repository triggers the CI/CD pipeline you have created.
   
    ![add Web Hook](./images/addWebHook1.png)

10. Go back to the SAP Continous Integration & Delivery service Choose the **Jobs** tab and **+** icon to create a new job.
   
11.  In the next screen, enter the following inputs :
    
    - In the **Job Name** field for example 'my-mission'
    - In the **Repository** field select the repository which we have created in step 3.
    - In the **Branch** field select your default branch (master or main)
    - In the **Pipeline** field select **SAP Cloud Application Programming Model**
    - The **Version** is set to 1.0 or the latest 
    - Set the **State** to **on**
    - In the **Build retention** section set **Keep the Logs** = 7 days and **Keep maximum** = 50 build items
    
    ![create CICD Job](./images/repojob.png)
    
12. In the **Stages** section do the following:
    - As **Configuration Mode** select **Job Editor**
    - As **Build Tool** select **mta**
    - In the Release sub-section, choose **Deploy to Cloud Foundry** to **ON**
    - In the field **API Endpoint** set the API Endpoint of your BTP subaccount
    - In the field **Org Name** set the organization name of your BTP subaccount
    - In the field **Space** set the name of the space where you have deployed the app
    - In the **Credentials** field select the credentials for your cloud account which you have created in the section before 
  
     ![create CICD Job](./images/repojob2.png)
     ![create CICD Job](./images/repojob2a.png)
 
     >You find the relevant data for your subaccount in the subaccount overview    
     ![copy Cloud Data](./images/copyCloudData.png)
      Choose **Spaces** and copy the space name.
     ![copy Space Name](./images/copySpaceName.png)  
    
    
13. Choose **Create** to save the job.

14. To trigger the pipeline manually, select the CI/CD job you have created and press the **Run** button as shown below. 

    ![manual trigger Job](./images/triggerbuild.png)
    
15. The job take some minutes. After it has finished you can see the log results of **Build** and **Deploy**. To view the full log file, click on the respective tile.
	
    ![Build Deploy Results](./images/buildDeployResults.png)   


### Result
You have successfully configured and added a Continuous Integration & Continous Delivery pipeline to your cloud application.

### Related Links
- [Blog: Achieve Continuous Integration and Delivery using DevOps services in SAP Cloud Platform
Pipeline for SAP CAP Applications](https://blogs.sap.com/2020/09/07/achieve-continuous-integration-and-delivery-using-devops-services-in-sap-cloud-platform/)
- [SAP Help: SAP Continous Integration and Delivery Service](https://help.sap.com/docs/CICD_OVERVIEW)
- [Github Security](https://github.blog/category/security/)
- [Assigning Roles and Permissions for SAP Continuous Integration and Delivery](https://help.sap.com/viewer/99c72101f7ee40d0b2deb4df72ba1ad3/Cloud/en-US/c679ebdbe76142bd9fb1071e5e53511d.html)
