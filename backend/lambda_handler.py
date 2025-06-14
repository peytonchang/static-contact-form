import json
import boto3

ses = boto3.client('ses', region_name='us-east-1')  # Adjust region if you're not using us-east-1

def lambda_handler(event, context):
    try:
        print("Raw event:", event)

        body = json.loads(event['body'])

        name = body.get('name', 'No name')
        email = body.get('email', 'No email')
        message = body.get('message', 'No message')

        subject = f"New Contact Form Submission from {name}"
        email_body = (
            f"You received a new message from your contact form.\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n\n"
            f"Message:\n{message}"
        )

        from_email = "peytonchang07@gmail.com"  # MUST match your verified SES identity
        to_email = "peytonchang07@gmail.com"    # Can be same for now

        response = ses.send_email(
            Source=from_email,
            Destination={'ToAddresses': [to_email]},
            Message={
                'Subject': {'Data': subject},
                'Body': {'Text': {'Data': email_body}}
            }
        )

        print("SES response:", response)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': f"Thanks {name}, your message was sent!"})
        }

    except Exception as e:
        print("Error sending email:", str(e))
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Internal Server Error'})
        }