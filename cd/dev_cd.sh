#자동 배포 및 실행 프로세스

#cd ~/apps/sgi-edu
echo '소스 다운로드 시작'
cd /home/ec2-user/apps/test/sgi-edu
git pull 
echo '소스가 정상 다운로드 되었습니다'
echo '빌드를  시작 합니다.'
pm2 restart dev
echo '빌드를 완료 하였습니다.'