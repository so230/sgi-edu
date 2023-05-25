#자동 배포 및 실행 프로세스

#cd ~/apps/sgi-edu
echo '소스 다운로드 시작'
rm ~/apps/sgi-edu.tar
cd ~/apps/sgi-edu
git pull --rebase
echo '소스가 정상 다운로드 되었습니다'
echo '빌드를  시작 합니다.'
#npm build
echo '빌드를 완료 하였습니다.'
echo 'test 시작'
#npm run test
echo 'test 완료'
echo '배포 시작'

cd ~/apps
tar -cf sgi-edu.tar ./sgi-edu/*
ssh -i /home/ec2-user/keys/private_was.pem ubuntu@10.0.3.225 rm /home/ubuntu/cd/sgi-edu.tar
scp -i /home/ec2-user/keys/private_was.pem ~/apps/sgi-edu.tar ubuntu@10.0.3.225:/home/ubuntu/cd
ssh -i /home/ec2-user/keys/private_was.pem ubuntu@10.0.3.225 tar -xf /home/ubuntu/cd/sgi-edu.tar
ssh -i /home/ec2-user/keys/private_was.pem ubuntu@10.0.3.225 cp -rf /home/ubuntu/sgi-edu/monolithic/* /home/ubuntu/apps/sgi-edu/monolithic/
ssh -i /home/ec2-user/keys/private_was.pem ubuntu@10.0.3.225 pm2 restart server
echo '배포 완료'

# scp -i ./sgi-edu-3.pem ./private_was.pem ec2-user@ec2-15-165-75-155.ap-northeast-2.compute.amazonaws.com:/home/ec2-user/keys


#excute on ec2
#cd ~/cd/sgi-edu/monolithic
#node server.js