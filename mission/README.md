# Mission: Business Events with SAP SuccessFactors and SAP Event Mesh


## Description

This [Mission](https://discovery-center.cloud.sap/missiondetail/3368/3404) showcases:

* Capabilities of SAP Business Technology Platform (SAP BTP) with SAP Extension Suite
* Building a reference application on SAP BTP using SAP Cloud Application Programming Model (CAP)
* Building an Event driven extension application using Event Mesh
* Consuming REST API's from SAP SuccessFactors using SAP Destination service

## The Business Scenario

In this reference application called as 'Run Smooth', a business scenario is used to showcase the technology components. A manager uses the Run Smooth application to maintain the staffing details of all the projects to which the employees reporting to him are contributing to. He can create projects and assign employees to these projects. An employee contributing to a project might decide to leave the team or the company. When this happens, the manager gets a notification with the projects that the employee is working on and the skillsets of the employee. This information can be used by the manager to find and hire a replacement for an employee and assign the right projects.

Extension Application Capabilities:
* Create projects
* Assign employees
* View the list of projects and employees working on these projects.
* Get notification when an employee is leaving the team with the consolidated report on the skills of the employee.

## Persona

For the complete installation, configuration and implementation of this scenario, the following persona are involved:

* **SAP SuccessFactors Administrator**
* **Cloud Administrator for SAP BTP**
* **Cloud Application Developer**

**Abbreviation:** SAP Business Technology Platform = SAP BTP

## Architecture

![Solution Diagram](./images/SolutionDiagram.png) 

## Requirements
For running this mission you need a SAP BTP, Cloud Foundry sub-account with the following services und runtimes:

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| SAP Destination Service           | lite       |          1          |
| Event Mesh          | default    |          1          |
| SAP HANA Schemas & HDI Containers | hdi-shared |          1          |
| SAP SuccessFactors Extensibility  | api-access |          1          |
| SAP Hana Cloud                    | hana |          1          |
| Cloud Foundry Runtime   | memory         |          3          |
| Continuous Integration & Delivery	    |  default	 |	    1	       |
|Launchpad     |  Standard	 |	    1       |


## Step-by-Steps Guides

* [Explore SAP SuccessFactors API in SAP API Business Hub](./api-hub/README.md) 
* [Setup your SAP BTP Account using Boosters](./scp-setup/README.md) 
* [Setup Trust between your SAP BTP sub-account and your SAP SuccessFactors account](./trust-setup/README.md)
* [Configure, deploy and build the CAP Extension Application](./extension-app/README.md)
* [Integrate SAP Continuous Integration & Delivery (optional)](./cicd/README.md) 
* [Confgure the SAP Event Mesh Service](./ems-config/README.md) 
* [Configure Eventing in SAP SuccessFactors](./sf-configuration/README.md)
* [Testing your Scenario by running the Reference Application](./run-demo/README.md)




