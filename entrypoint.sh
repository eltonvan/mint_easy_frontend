#!/bin/sh

# If SSL certificates don't exist, obtain them using Certbot
if [ ! -d "/etc/letsencrypt/live/$CERTBOT_DOMAIN" ]; then
    certbot --nginx -d $CERTBOT_DOMAIN --non-interactive --agree-tos --register-unsafely-without-email --quiet
fi

# Generate Nginx configuration file with SSL settings
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 80;
    server_name $CERTBOT_DOMAIN;

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name $CERTBOT_DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$CERTBOT_DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$CERTBOT_DOMAIN/privkey.pem;

    # Other SSL configurations (e.g., SSL protocols, ciphers, etc.)

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Run Certbot in the background for automatic renewal (every 12 hours)
(certbot renew --quiet --no-random-sleep-on-renew --post-hook "nginx -s reload") &

# Start NGINX in the foreground
exec nginx -g 'daemon off;'

