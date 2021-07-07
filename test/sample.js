const system_env_json ={
	"VCAP_SERVICES": {
		"hana": [
			{
				"label": "hana",
				"provider": null,
				"plan": "hdi-shared",
				"name": "cloud-sf-extension-cap-sample-db-hdi-container",
				"tags": [
					"hana",
					"database",
					"relational"
				],
				"instance_guid": "5d146f64-ce8f-4bda-983a-5809feb11348",
				"instance_name": "cloud-sf-extension-cap-sample-db-hdi-container",
				"binding_guid": "3337f4ed-0324-4d05-80a6-a9946bf9aa21",
				"binding_name": null,
				"credentials": {
					"host": "zeus.hana.prod.eu-central-1.whitney.dbaas.ondemand.com",
					"port": "29486",
					"driver": "com.sap.db.jdbc.Driver",
					"url": "jdbc:sap://zeus.hana.prod.eu-central-1.whitney.dbaas.ondemand.com:29486?encrypt=true&validateCertificate=true&currentschema=E16C58FDF1FE4FF68C715C6724FF87B7",
					"schema": "E16C58FDF1FE4FF68C715C6724FF87B7",
					"hdi_user": "E16C58FDF1FE4FF68C715C6724FF87B7_3EZ0JTFLEUHP1ZQ376YAFQDTD_DT",
					"hdi_password": "Cg2o.qcu4IgBaRDJLOpnr7udg4zmGJyhPppahGcrTKF3sLqAJVNWcopn22WaLHY2M896QGAb1-QsF0Yv.59Tz5t.8aRNuWeACVSozi81fT56ZniM98EI_vGfyD5SXh4i",
					"user": "E16C58FDF1FE4FF68C715C6724FF87B7_3EZ0JTFLEUHP1ZQ376YAFQDTD_RT",
					"password": "Rf5oE6m35B6kNM6MeZj.AzIvC1KIqN4Oq2G436w_5BrbGb8X6OTZzWl2TK29lf.e-8Zn4B5_lCgvy-J1ysvn92Bv6vIDzeZX2gy7tdH00Z8I9ooa-dC9zwR1qm2Tn286",
					"certificate": "-----BEGIN CERTIFICATE-----\nMIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh\nMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3\nd3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD\nQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT\nMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j\nb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB\nCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97\nnh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt\n43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P\nT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4\ngdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO\nBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR\nTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw\nDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr\nhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg\n06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF\nPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls\nYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk\nCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=\n-----END CERTIFICATE-----\n"
				},
				"syslog_drain_url": null,
				"volume_mounts": []
			}
		],
		"destination": [
			{
				"label": "destination",
				"provider": null,
				"plan": "lite",
				"name": "cloud-sf-extension-cap-sample-destination",
				"tags": [
					"destination",
					"conn",
					"connsvc"
				],
				"instance_guid": "37350381-6e67-4b89-b915-4477ea017805",
				"instance_name": "cloud-sf-extension-cap-sample-destination",
				"binding_guid": "72507cb1-e66c-4744-a081-0ac492c4da3a",
				"binding_name": null,
				"credentials": {
					"uaadomain": "authentication.eu10.hana.ondemand.com",
					"tenantmode": "dedicated",
					"clientid": "sb-clone373503816e674b89b9154477ea017805!b11427|destination-xsappname!b404",
					"instanceid": "37350381-6e67-4b89-b915-4477ea017805",
					"verificationkey": "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwThn6OO9kj0bchkOGkqYBnV1dQ3zU/xtj7Kj7nDd8nyRMcEWCtVzrzjzhiisRhlrzlRIEY82wRAZNGKMnw7cvCwNixcfcDJnjzgr2pJ+5/yDZUc0IXXyIWPZD+XdL+0EogC3d4+fqyvg/BF/F0t2hKHWr/UTXE6zrGhBKaL0d8rKfYd6olGWigFd+3+24CKI14zWVxUBtC+P9Fhngc9DRzkXqhxOK/EKn0HzSgotf5duq6Tmk9DCNM4sLW4+ERc6xzrgbeEexakabvax/Az9WZ4qhwgw+fwIhKIC7WLwCEJaRsW4m7NKkv+eJR2LKYesuQ9SVAJ3EXV86RwdnH4uAv7lQHsKURPVAQBlranSqyQu0EXs2N9OlWTxe+FyNkIvyZvoLrZl/CdlYc8AKxRm5rn2/88nkrYQ0XZSrnICM5FRWgVF2hn5KfZGwtBN85/D4Yck6B3ocMfyX7e4URUm9lRPQFUJGTXaZnEIge0R159HUwhTN1HvyXrs6uT1ZZmW+c3p47dw1+LmUf/hIf8zd+uvHQjIeHEJqxjqfyA8yqAFKRHKVFrwnwdMHIsRap2EKBhHMfeVf0P2th5C9MggYoGCvdIaIUgMBX3TtCdvGrcWML7hnyS2zkrlA8SoKJnRcRF2KxWKs355FhpHpzqyZflO5l98+O8wOsFjGpL9d0ECAwEAAQ==-----END PUBLIC KEY-----",
					"xsappname": "clone373503816e674b89b9154477ea017805!b11427|destination-xsappname!b404",
					"identityzone": "referenceapps",
					"clientsecret": "72507cb1-e66c-4744-a081-0ac492c4da3a$0qLDZbDQIPvgew7mZt327PGp17PO6LggvBCIJpjddZU=",
					"tenantid": "5c4ba6d6-22ac-4a17-9681-7e5d4dca9be9",
					"uri": "https://destination-configuration.cfapps.eu10.hana.ondemand.com",
					"url": "https://referenceapps.authentication.eu10.hana.ondemand.com"
				},
				"syslog_drain_url": null,
				"volume_mounts": []
			}
		],
		"enterprise-messaging": [
			{
				"label": "enterprise-messaging",
				"provider": null,
				"plan": "default",
				"name": "cloud-sf-extension-cap-sample-epm",
				"tags": [
					"enterprise-messaging"
				],
				"instance_guid": "5f0b2907-acf7-40ac-b1a2-5fdee0102c94",
				"instance_name": "cloud-sf-extension-cap-sample-epm",
				"binding_guid": "936105c0-36d6-4f65-bb58-60f82265e077",
				"binding_name": null,
				"credentials": {
					"namespace": "referenceappscf/emsf/1909",
					"xsappname": "default-5f0b2907-acf7-40ac-b1a2-5fdee0102c94-clone!b11427|xbem-service-broker-!b2436",
					"management": [
						{
							"oa2": {
								"clientid": "sb-default-5f0b2907-acf7-40ac-b1a2-5fdee0102c94-clone!b11427|xbem-service-broker-!b2436",
								"clientsecret": "a63fa9a2-4e50-4c9b-8359-b2b04f3eeab0$uZ3OA2331xrVQU89BpiIW3CsoYmOKnqxLUkUw3Wfq7k=",
								"tokenendpoint": "https://referenceapps.authentication.eu10.hana.ondemand.com/oauth/token",
								"granttype": "client_credentials"
							},
							"uri": "https://enterprise-messaging-hub-backend.cfapps.eu10.hana.ondemand.com"
						}
					],
					"serviceinstanceid": "5f0b2907-acf7-40ac-b1a2-5fdee0102c94",
					"messaging": [
						{
							"oa2": {
								"clientid": "sb-default-5f0b2907-acf7-40ac-b1a2-5fdee0102c94-clone!b11427|xbem-service-broker-!b2436",
								"clientsecret": "a63fa9a2-4e50-4c9b-8359-b2b04f3eeab0$uZ3OA2331xrVQU89BpiIW3CsoYmOKnqxLUkUw3Wfq7k=",
								"tokenendpoint": "https://referenceapps.authentication.eu10.hana.ondemand.com/oauth/token",
								"granttype": "client_credentials"
							},
							"protocol": [
								"amqp10ws"
							],
							"broker": {
								"type": "sapmgw"
							},
							"uri": "wss://enterprise-messaging-messaging-gateway.cfapps.eu10.hana.ondemand.com/protocols/amqp10ws"
						},
						{
							"oa2": {
								"clientid": "sb-default-5f0b2907-acf7-40ac-b1a2-5fdee0102c94-clone!b11427|xbem-service-broker-!b2436",
								"clientsecret": "a63fa9a2-4e50-4c9b-8359-b2b04f3eeab0$uZ3OA2331xrVQU89BpiIW3CsoYmOKnqxLUkUw3Wfq7k=",
								"tokenendpoint": "https://referenceapps.authentication.eu10.hana.ondemand.com/oauth/token",
								"granttype": "client_credentials"
							},
							"protocol": [
								"mqtt311ws"
							],
							"broker": {
								"type": "sapmgw"
							},
							"uri": "wss://enterprise-messaging-messaging-gateway.cfapps.eu10.hana.ondemand.com/protocols/mqtt311ws"
						},
						{
							"oa2": {
								"clientid": "sb-default-5f0b2907-acf7-40ac-b1a2-5fdee0102c94-clone!b11427|xbem-service-broker-!b2436",
								"clientsecret": "a63fa9a2-4e50-4c9b-8359-b2b04f3eeab0$uZ3OA2331xrVQU89BpiIW3CsoYmOKnqxLUkUw3Wfq7k=",
								"tokenendpoint": "https://referenceapps.authentication.eu10.hana.ondemand.com/oauth/token",
								"granttype": "client_credentials"
							},
							"protocol": [
								"httprest"
							],
							"broker": {
								"type": "saprestmgw"
							},
							"uri": "https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com"
						}
					]
				},
				"syslog_drain_url": null,
				"volume_mounts": []
			}
		],
		"xsuaa": [
			{
				"label": "xsuaa",
				"provider": null,
				"plan": "application",
				"name": "cloud-sf-extension-cap-sample-uaa",
				"tags": [
					"xsuaa"
				],
				"instance_guid": "9af2595d-ef18-4704-a65f-75b04ad1eefc",
				"instance_name": "cloud-sf-extension-cap-sample-uaa",
				"binding_guid": "551c3bf9-5875-4e2d-a740-d55f6562e665",
				"binding_name": null,
				"credentials": {
					"tenantmode": "dedicated",
					"sburl": "https://internal-xsuaa.authentication.eu10.hana.ondemand.com",
					"subaccountid": "5c4ba6d6-22ac-4a17-9681-7e5d4dca9be9",
					"clientid": "sb-cloud-sf-extension-cap-sample-uaa-referenceappscf-CICD_SFSF!t11427",
					"xsappname": "cloud-sf-extension-cap-sample-uaa-referenceappscf-CICD_SFSF!t11427",
					"clientsecret": "XgOizgUU1geq92mKb3w+QbD6yfA=",
					"url": "https://referenceapps.authentication.eu10.hana.ondemand.com",
					"uaadomain": "authentication.eu10.hana.ondemand.com",
					"verificationkey": "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwThn6OO9kj0bchkOGkqYBnV1dQ3zU/xtj7Kj7nDd8nyRMcEWCtVzrzjzhiisRhlrzlRIEY82wRAZNGKMnw7cvCwNixcfcDJnjzgr2pJ+5/yDZUc0IXXyIWPZD+XdL+0EogC3d4+fqyvg/BF/F0t2hKHWr/UTXE6zrGhBKaL0d8rKfYd6olGWigFd+3+24CKI14zWVxUBtC+P9Fhngc9DRzkXqhxOK/EKn0HzSgotf5duq6Tmk9DCNM4sLW4+ERc6xzrgbeEexakabvax/Az9WZ4qhwgw+fwIhKIC7WLwCEJaRsW4m7NKkv+eJR2LKYesuQ9SVAJ3EXV86RwdnH4uAv7lQHsKURPVAQBlranSqyQu0EXs2N9OlWTxe+FyNkIvyZvoLrZl/CdlYc8AKxRm5rn2/88nkrYQ0XZSrnICM5FRWgVF2hn5KfZGwtBN85/D4Yck6B3ocMfyX7e4URUm9lRPQFUJGTXaZnEIge0R159HUwhTN1HvyXrs6uT1ZZmW+c3p47dw1+LmUf/hIf8zd+uvHQjIeHEJqxjqfyA8yqAFKRHKVFrwnwdMHIsRap2EKBhHMfeVf0P2th5C9MggYoGCvdIaIUgMBX3TtCdvGrcWML7hnyS2zkrlA8SoKJnRcRF2KxWKs355FhpHpzqyZflO5l98+O8wOsFjGpL9d0ECAwEAAQ==-----END PUBLIC KEY-----",
					"apiurl": "https://api.authentication.eu10.hana.ondemand.com",
					"identityzone": "referenceapps",
					"identityzoneid": "5c4ba6d6-22ac-4a17-9681-7e5d4dca9be9",
					"tenantid": "5c4ba6d6-22ac-4a17-9681-7e5d4dca9be9",
					"zoneid": "5c4ba6d6-22ac-4a17-9681-7e5d4dca9be9"
				},
				"syslog_drain_url": null,
				"volume_mounts": []
			}
		]
	}
};
const application_env_json ={
	"VCAP_APPLICATION": {
		"cf_api": "https://api.cf.eu10.hana.ondemand.com",
		"limits": {
			"fds": 32768,
			"mem": 512,
			"disk": 512
		},
		"application_name": "cloud-sf-extension-cap-sample-srv",
		"application_uris": [
			"referenceappscf-cicd-sfsf-cloud-sf-extension-cap-sample-srv.cfapps.eu10.hana.ondemand.com"
		],
		"name": "cloud-sf-extension-cap-sample-srv",
		"space_name": "CICD_SFSF",
		"space_id": "d458412f-d98d-4492-973e-f2faea470a48",
		"organization_id": "94ef7b89-5b19-4a91-a72c-e998d064ec9d",
		"organization_name": "referenceappscf",
		"uris": [
			"referenceappscf-cicd-sfsf-cloud-sf-extension-cap-sample-srv.cfapps.eu10.hana.ondemand.com"
		],
		"users": null,
		"process_id": "2b7194ac-1d12-47a3-a650-f41624a5438e",
		"process_type": "web",
		"application_id": "2b7194ac-1d12-47a3-a650-f41624a5438e",
		"version": "e0e1b53f-8d62-41e4-b172-2bdea5bd2820",
		"application_version": "e0e1b53f-8d62-41e4-b172-2bdea5bd2820"
	}
};

module.exports= {
    system_env_json : system_env_json,
    application_env_json: application_env_json
};