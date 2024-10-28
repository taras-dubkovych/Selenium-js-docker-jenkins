pipeline {
    agent {
        docker {
            image 'docker:19.03-dind'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true
        }
    }

    stages {
        stage('Install Node.js') {
            steps {
                sh '''
                apk add --no-cache nodejs npm
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                ls -la
                node --version
                npm --version
                npm install selenium-webdriver mocha chromedriver --save-dev
                npm install chai --save-dev
                npm install mocha-junit-reporter --save-dev
                '''
            }
        }

        stage('Start Selenium Server') {
            steps {
                sh '''
                docker run -d --name selenium-chrome -p 4444:4444 selenium/standalone-chrome:latest
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                ls -la
                npm test
                '''
            }
        }
    }

    post {
        always {
            sh 'docker stop selenium-chrome || true && docker rm selenium-chrome || true'
            archiveArtifacts artifacts: 'test-results.xml', allowEmptyArchive: true
            junit 'test-results.xml'
        }
    }
}
