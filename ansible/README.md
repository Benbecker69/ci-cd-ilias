# Ansible Deployment

This directory contains Ansible playbooks for deploying the Next.js e-commerce application to GCP VM.

## Structure

```
ansible/
├── deploy.yml              # Main deployment playbook
├── inventory/
│   ├── staging.ini        # Staging environment inventory
│   └── production.ini     # Production environment inventory
└── templates/
    └── nextjs.service.j2  # Systemd service template
```

## Features

- **Idempotent**: Can be run multiple times safely
- **Node.js Installation**: Automatically installs Node.js 20.x if not present
- **Systemd Service**: Configures application as a system service
- **Health Checks**: Validates deployment via `/api/health` endpoint
- **Zero-downtime**: Uses systemd restart for minimal downtime

## Deployment Process

1. Update system packages
2. Install Node.js and build tools
3. Create application directory
4. Copy application files (excluding unnecessary directories)
5. Install npm dependencies
6. Build Next.js application
7. Configure systemd service
8. Start/restart application
9. Verify health check

## Environment Variables

The playbook uses these environment variables (set via GitHub Secrets):

- `SSH_HOST`: Server IP address
- `SSH_USER`: SSH username
- `SSH_PORT`: SSH port (default: 22)
- `APP_PORT`: Application port (default: 3003)

## Manual Deployment (Local)

If you need to deploy manually from your local machine:

```bash
# Install Ansible
sudo apt-get install ansible

# Set environment variables
export SSH_HOST=your_server_ip
export SSH_USER=your_username
export SSH_PORT=22
export APP_PORT=3003

# Run playbook for staging
ansible-playbook -i inventory/staging.ini deploy.yml

# Run playbook for production
ansible-playbook -i inventory/production.ini deploy.yml
```

## Service Management

On the server, you can manage the service with:

```bash
# Check status
sudo systemctl status ecommerce-nextjs

# View logs
sudo journalctl -u ecommerce-nextjs -f

# Restart service
sudo systemctl restart ecommerce-nextjs

# Stop service
sudo systemctl stop ecommerce-nextjs
```

## Health Check

The application exposes a health check endpoint at `/api/health`:

```bash
curl http://SERVER_IP:3003/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-16T...",
  "uptime": 123.45,
  "environment": "production"
}
```
