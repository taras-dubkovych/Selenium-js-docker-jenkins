pipeline {
    agent any

    // environment {
    //     DOCKER_COMPOSE_PATH = './docker-compose.yml'
    // }
    

    stages {

        stage ('Docker'){
            steps{
                sh 'docker build -t my-docker .'
            }
        }

        // stage('Start Selenium Grid') {
        //     steps {
        //         sh 'docker-compose -f $DOCKER_COMPOSE_PATH up -d'
        //     }
        //}

        stage('Run Tests') {
           agent {
            docker{
                image 'my-docker'
                reuseNode true
            }
           }
            steps {
                sh 'npm test'
            }
        }

        // stage('Stop Selenium Grid') {
        //     steps {
        //         sh 'docker-compose -f $DOCKER_COMPOSE_PATH down'
        //     }
        // }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results.xml', allowEmptyArchive: true
            junit 'test-results.xml'
        }
    }
}