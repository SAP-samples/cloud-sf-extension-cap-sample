#!/usr/bin/env groovy
@Library(['piper-lib', 'piper-lib-os']) _
stage ('Central Build') { 
	node{
	 dockerExecuteOnKubernetes(script: this, dockerEnvVars: ['pusername':pusername, 'puserpwd':puserpwd] , dockerImage: 'docker.wdf.sap.corp:51010/sfext:latest', dockerWorkspace: '/home/node') {		 
	 sh '''
			    pwd
			    echo $pusername
			    rm -rf cloud-cap-sfextension-edmx-sample
			    git -c http.sslVerify=false clone https://github.wdf.sap.corp/i307469/cloud-cap-sfextension-edmx-sample --branch master 
			    cd cloud-cap-sfextension-edmx-sample
			    ls
			    cd /home/jenkins/agent/workspace/cloud-sf-xf-cap-sample/cloud-cap-sfextension-edmx-sample/test
			    npm i
			    cf login -u $puser -p $ppass -a $sfcfapi -o $sforg -s $sfspace
			    pwd
			    cf curl /v2/apps/3a03123c-0e68-4853-baa4-4867e080ecce/env > sample.json
			    ls
			    jest ./test
			    '''
              }
}
} 
