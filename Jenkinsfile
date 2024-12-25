pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'Dileepa', url: 'https://github.com/DileepaLakshan/Sever.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t parakkrama/nodeapp-cuban:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
               withCredentials([string(credentialsId: 'dockerPassword', variable: 'docker_password')]) {
    script {
                        bat "docker login -u parakkrama -p %docker_password%"
                    }

                
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push parakkrama/nodeapp-cuban:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}

}