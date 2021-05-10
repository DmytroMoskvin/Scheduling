using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduling.Services
{
    public class EmailServiceSettings
    {

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class EmailService
    {

        IConfiguration Configuration { get; }
        EmailServiceSettings Settings { get; set; }
        string BaseUrl { get; set; }
        public EmailService(IConfiguration configuration)
        {
            Configuration = configuration;

            Settings = new EmailServiceSettings();
            Configuration.GetSection("EmailServiceSettings").Bind(Settings);
            BaseUrl = Configuration.GetSection("BaseUrl").Value;
        }

        public void SendEmail(string email, string password)
        {
            
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress(Settings.Name, Settings.Email)); //sender
            message.To.Add(new MailboxAddress(Settings.Name, email)); //destination
            message.Subject = "Welcome to Scheduling"; //subject
            message.Body = new BodyBuilder() { HtmlBody = $"<div style=\"color: green;\">Password to your account {password}</div>" }.ToMessageBody(); //message body

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 465, true); 
            client.Authenticate(Settings.Email, Settings.Password); //sender's login and password
            client.Send(message);

            client.Disconnect(true);
            
            
        }

        public void SendRestorePasswordEmail(string email, string token)
        {

            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress(Settings.Name, Settings.Email)); //sender
            message.To.Add(new MailboxAddress(Settings.Name, email)); //destination
            message.Subject = "Restore password"; //subject
            message.Body = new BodyBuilder() { HtmlBody = $"<div>To reset your password, follow the <a href='{BaseUrl}resetPassword/{token}'>link.</a></div>" }.ToMessageBody(); //message body

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 465, true);
            client.Authenticate(Settings.Email, Settings.Password); //sender's login and password
            client.Send(message);

            client.Disconnect(true);
            
        }
    }
}
