<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 6/5/2015
 * Time: 5:57 PM
 */

namespace App\services\mailboxes;
use Tops\services;
use Tops\services\TServiceCommand;
use Tops\sys\TEMailMessage;
use Tops\sys\TPostOffice;

class SendMessageCommand extends TServiceCommand {
    
    
    private function createMessage($dto) {
        if (!$dto) {
            $this->addErrorMessage('No service request recieved.');
            return null;
        }

        $mailboxCode =  isset($dto->mailboxCode) ? trim($dto->mailboxCode) : '';
        if (empty($mailboxCode)) {
            $this->addErrorMessage("Application error: expected mailbox code.");
            return null;
        }

        $fromName =  isset($dto->fromName) ? trim($dto->fromName) : '';
        $fromAddress =  isset($dto->fromAddress) ? trim($dto->fromAddress) : '';
        $subject =  isset($dto->subject) ? trim($dto->subject) : '';
        $body =  isset($dto->body) ? trim($dto->body) : '';


        $mgr = TPostOffice::GetMailboxManager();
        $box = $mgr->findByCode($mailboxCode);
        if ($box === null) {
            $this->addErrorMessage("Application error: Cannot find mailbox for '$mailboxCode'");
        }


        $toName =  $box->getName();
        $toAddress =  $box->getEmail();

        $message = new TEMailMessage();
        if (empty($toAddress)) {
            $this->addErrorMessage("Application error: Invalid mailbox $mailboxCode");
        }
        else {
            $toName =  empty($toName) ? null : trim($toName);
            $message->setRecipient($toAddress,$toName);
        }

        if (empty($fromAddress)) {
            $this->addErrorMessage('Your e-mail address is required');
        }
        else {
            $message->setFromAddress('webclerk@scym.org','SCYM Messages');
            // $message->setFromAddress('messageform@scym.org','SCYM Messages');
            $fromName =  empty($fromName) ? null : trim($fromName);
            // $message->setFromAddress($fromAddress,$fromName);
            $senderAddress = empty($fromName) ? $fromAddress : "$fromName ($fromAddress)";
            $body = "This message sent from the SCYM website on behalf of $senderAddress'. Do not reply directly.\n\n$body";
        }

        if (empty($subject)) {
            $this->addErrorMessage('A subject is required');
        }
        else {
            if (stristr( $subject,'http:') || stristr($subject,'https:')) {
                $this->addErrorMessage('Links or urls are not permitted in these messages.');
            }
            else {
                $message->setSubject($subject);
            }
        }

        if (empty($body)) {
            $this->addErrorMessage('A message body is required');
        }
        else {
            $text =  strtolower($body);
            if (strstr( $text,'http:') || strstr( $text,'https:')) {
                $this->addErrorMessage('Links or urls are not permitted in these messages.');
            }
            else {
                if (isset($dto->registrationCode)) {
                    $body .= "\n\nView registration: http://www.scym.org/register?code=$dto->registrationCode";
                }
                $message->setMessageBody($body);
            }
        }

        $errors = $message->getValidationErrors();
        foreach($errors as $email => $error) {
            if (stristr($email,$toAddress)) {
                $this->addErrorMessage("Application error: Invalid address in mailbox '$mailboxCode''");
            }
            else {
                $this->addErrorMessage("The address '$email' is invalid: $error");
            }
        }

        return $message;
    }
    
    protected function run()
    {
        $dto = $this->getRequest();
        $message = $this->createMessage($dto);
        if ($message == null || $this->hasErrors()) {
            $this->addErrorMessage('Sorry, we are not able to send your message.');
            return;
        }
        TPostOffice::Send($message);
        $this->addInfoMessage("Message sent.");

    }
}