pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        AWS_ACCOUNT_ID="027618948712"
        AWS_DEFAULT_REGION="us-east-1"
        IMAGE_REPO_NAME="myecr"
        IMAGE_TAG="latest"
        
        REPOSITORY_URI = "AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/aws-ecr-node"
    }
   
    stages {
       
         stage('Logging into AWS ECR') {
            steps {
                script {
                sh """aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
                }
                 
            }
        }
        stage('intialising npm installation.......') {
            steps {
                sh 'npm install'
  
       
            }
        }


       
        stage('Cloning Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/sd031/aws_codebuild_codedeploy_nodeJs_demo.git']]])    
            }
        }
 
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
          
        }
      }
    }

   
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
                sh """docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"""
                sh """docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"""
         }
        }
      }
    }
}