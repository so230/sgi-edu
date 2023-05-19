#!/bin/bash

#자동 배포 및 실행 프로세스 

#git push
cd ~/apps/sgi-edu
git push
rm sgi-edu.tar
#tar -cf ~/apps/sgi-edu.tar ~/apps/sgi-edu
#ssh -i /home/ec2-user/keys/private_was.pem ubuntu@ip rm /home/ubuntu/cd/sgi-edu.tar
#scp -i /home/ec2-user/keys/private_was.pem ubuntu@ip sgi-edu.tar ubuntu@10.0.3.225:/home/ubuntu/cd
#ssh -i /home/ec2-user/keys/private_was.pem ubuntu@ip tar -xf sgi-edu.tar


# scp -i ./sgi-edu-3.pem ./private_was.pem ec2-user@ec2-15-165-75-155.ap-northeast-2.compute.amazonaws.com:/home/ec2-user/keys


#excute on ec2
#cd ~/cd/sgi-edu/monolithic
#node server.js