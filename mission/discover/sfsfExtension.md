## Integrate SAP BTP and SAP SuccessFactors



To integrate SAP BTP and SAP SuccessFactors so that you can build extension applications, first you have to pair a global account in SAP BTP and an SAP SuccessFactors system. This will enable you to consume the SAP SuccessFactors APIs in a subaccount of this global account. 

Then, you need to configure a common identity provider between the subaccount in SAP BTP and the SAP SuccessFactors system. This means you will set up Single Sign-On (SSO) and you will be able to have principal propagation in the API calls to your SAP SuccessFactors system.

We recommend that you first go through the documentation before the actual integration. For more information, see [Extending SAP SuccessFactors in the Cloud Foundry and Kyma Environment](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/9e33934540c44681817567d6072effb2.html).

### Additional Resources:

Apart from the official documentation that you already read, you can use the following resources to help you succeed in creating your extension application:

* [Guided Answers for SAP SuccessFactors Extensions](https://ga.support.sap.com/dtp/viewer/#/tree/2065/actions/26547:28984:28985)
* [Building Extensions with SAP BTP community page](https://community.sap.com/topics/extension-suite/building-extensions).