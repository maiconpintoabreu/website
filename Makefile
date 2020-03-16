download-certs:
	scp -i /home/maicon/.ssh/gcp-3 k3s.maicondev.com:/etc/letsencrypt/live/maicondev.com/fullchain.pem nginx/fullchain.pem
	scp -i /home/maicon/.ssh/gcp-3 k3s.maicondev.com:/etc/letsencrypt/live/maicondev.com/privkey.pem nginx/privkey.pem
	gpg --batch --yes --pinentry-mode loopback --passphrase ${SECRET_KEY} --output secrets/privkey.pem.gpg --symmetric --cipher-algo AES256 nginx/privkey.pem
	gpg --batch --yes --pinentry-mode loopback --passphrase ${SECRET_KEY} --output secrets/fullchain.pem.gpg --symmetric --cipher-algo AES256 nginx/fullchain.pem