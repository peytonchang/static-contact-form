# Static Contact Form

A serverless contact form built using:
- AWS Lambda (Node.js backend)
- Amazon SES for email delivery
- API Gateway for HTTP access
- S3 for static site hosting

### Folder Structure
- `backend/`: Lambda handler code
- `frontend/`: HTML/CSS/JS static site
- `deploy/`: Shell script to upload frontend to S3

### Deploy Instructions
1. Configure AWS credentials
2. Run `upload_to_s3.sh` to deploy frontend
3. Deploy Lambda via console or SAM/CLI