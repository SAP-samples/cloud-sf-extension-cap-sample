# Enterprise Messaging Service: Get Topic and Service Key values

For the communication between your SAP SuccessFactors account and the SAP Enterprise Messaging service we need a Service Key
and some parameter values. 


## Get the Topic
The Topic for the messaging was generated at the deployment of the extension application. 

1. In your SAP Cloud Platform subaccount select Subsriptions and search for the Enterprise Messaging Service. Click on "Go to Application"

   ![ems](./images/ems-1.png)

2. Logon to Enterprise Messaging Service. Select Message Clients and click on the client which you have defined in the enterpsiemessaging.json at the extension application.
   
   ![ems](./images/ems-2.png)



3. Select Queues and click on Queue Subscriptions (under Actions) 
   
   ![ems](./images/ems-3.png)

4. Copy the Subscribed Topic Name to a file. We will need it for the messaging setup in your SAP SuccessFactors account.

   ![ems](./images/ems-4.png)


## Generate Service Key

1. In your SAP Cloud Platform subaccount select Service Instances. Expand the Enterprise Messaging instance and at the ... - Select Create Service Key 
   
   ![ems](./images/ems-5.png)
   ![ems](./images/ems-5a.png)

2. New Service Key. Enter a key name e.g. emskey and click on Create.
   
   ![ems](./images/ems-6.png)

3. Click on the generated key. From the service key displayed, copy the content of the tag "messaging". Copy the clientid, clientsecret, tokenendpoint and Base url to a file. Remove the quotation marks. We will need those parameter for the messaging connection setup in SAP SuccessFactors
   
   ![ems](./images/ems-7.png)

