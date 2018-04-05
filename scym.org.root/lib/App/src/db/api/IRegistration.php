<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 12/3/2015
 * Time: 10:24 AM
 */
namespace App\db\api;


interface IRegistration
{
    /**
     * Get registrationId
     *
     * @return integer
     */
    public function getRegistrationId();

    /**
     * Get year
     *
     * @return string
     */
    public function getYear();

    /**
     * Get registrationCode
     *
     * @return string
     */
    public function getRegistrationCode();

    /**
     * Get statusId
     *
     * @return integer
     */
    public function getStatusId();

    /**
     * Get name
     *
     * @return string
     */
    public function getUsername();

    /**
     * Get name
     *
     * @return string
     */
    public function getName();

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress();

    /**
     * Get city
     *
     * @return string
     */
    public function getCity();

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone();

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail();

    /**
     * Get receivedDate
     *
     * @return \DateTime
     */
    public function getReceivedDate();

    /**
     * Get notes
     *
     * @return string
     */
    public function getNotes();

    /**
     * Get scymNotes
     *
     * @return string
     */
    public function getScymNotes();

    /**
     * Get financialAidContribution
     *
     * @return string
     */

    /**
     * Get financialAidAmount
     *
     * @return string
     */
    public function getFinancialAidAmount();
}