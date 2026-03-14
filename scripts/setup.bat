@echo off
echo Setting up Samsung MDM Remover...
cd backend
copy .env.example .env
cd ../frontend
npm install
cd ../backend
pip install -r requirements.txt
echo Setup complete! Run: docker-compose up or flask run
pause

