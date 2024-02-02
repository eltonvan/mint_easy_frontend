#!/bin/sh
if [ ! -d "/etc/letsencrypt/live/frontend.mint-easy.de" ]; then
    certbot --nginx -d frontend.mint-easy.de --non-interactive --agree-tos --register-unsafely-without-email
    # Start NGINX in the foreground
    exec nginx -g 'daemon off;'
fi
