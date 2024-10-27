pipeline {
    agent any

    stages {
        stage('Build') {
             agent{
                  docker{
                     image 'node:18-alpine'
                     reuseNode true
                    }
                  }
        steps {
            sh '''
            ls -la
            node --version
            npm --version   
            npm install selenium-webdriver mocha chromedriver --save-dev
            npm install chai --save-dev
            '''
            }
        }

        stage('Test'){
            agent{
                  docker{
                     image 'node:18-alpine'
                     reuseNode true
                    }
                  }
             steps {
                sh '''
                ls -la
                npm test
                '''
            }      
        }
    }
}
