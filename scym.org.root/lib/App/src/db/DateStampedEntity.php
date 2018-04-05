<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 6/29/2015
 * Time: 4:44 AM
 */

namespace App\db;
//abstract
use Tops\sys\TDateTime;

/**
 * @MappedSuperclass
 */
class DateStampedEntity {

    /**
     * @var \DateTime
     *
     * @Column(name="dateAdded", type="datetime", nullable=true)
     */
    protected $dateadded;

    /**
     * @var \DateTime
     *
     * @Column(name="dateUpdated", type="datetime", nullable=true)
     */
    protected $dateupdated;

    /**
     * @var string
     *
     * @Column(name="addedBy", type="string", length=100, nullable=true)
     */
    protected $addedby;

    /**
     * @var string
     *
     * @Column(name="updatedBy", type="string", length=100, nullable=true)
     */
    protected $updatedby;

    private $currentUserName;
    protected function getCurrentUserName() {
        if (!isset($this->currentUserName)) {
            $this->currentUserName = '';
            $user = \Tops\sys\TUser::getCurrent();
            if ($user != null) {
                $this->currentUserName = $user->getUserName();
            }

            if (empty($this->currentUserName)) {
                $this->setUsername('unknown');
            }
        }
        return $this->currentUserName;
    }



    public function setDateStamp($initial = true) {
        $now = new \DateTime();
        $username = $this->getCurrentUserName();
        if ($initial) {
            $this->setDateAdded( $now);
            $this->setAddedBy( $username );
        }
        $this->setDateUpdated($now);
        $this->setUpdatedBy($username);
    }

    public function setUpdateStamp() {
        $this->setDateStamp(false);
    }


    /**
     * Set addedby
     *
     * @param string $addedby
     * @return DateStampedEntity
     */
    public function setAddedBy($addedby)
    {
        $this->addedby = $addedby;

        return $this;
    }

    /**
     * Get addedby
     *
     * @return string
     */
    public function getAddedBy()
    {
        return $this->addedby;
    }

    /**
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return DateStampedEntity
     */
    public function setDateAdded($dateadded)
    {
        $this->dateadded = $dateadded;

        return $this;
    }

    /**
     * Get dateadded
     *
     * @return \DateTime
     */
    public function getDateAdded()
    {
        return $this->dateadded;
    }

    /**
     * Set dateupdated
     *
     * @param \DateTime $dateupdated
     * @return DateStampedEntity
     */
    public function setDateUpdated($dateupdated)
    {
        $this->dateupdated = $dateupdated;

        return $this;
    }

    /**
     * Get dateupdated
     *
     * @return \DateTime
     */
    public function getDateUpdated()
    {
        return $this->dateupdated;
    }
    /**
     * Set updatedby
     *
     * @param string $updatedby
     * @return DateStampedEntity
     */
    public function setUpdatedBy($updatedby)
    {
        $this->updatedby = $updatedby;

        return $this;
    }

    /**
     * Get updatedby
     *
     * @return string
     */
    public function getUpdatedBy()
    {
        return $this->updatedby;
    }


    /**
     * Set username
     *
     * @param string $username
     * @return DateStampedEntity
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }



    /** @PrePersist */
    public function doOnPrePersist()
    {
        $this->setDateStamp();
    }

    /** @PreUpdate */
    public function doOnPreUpdate()
    {
        $this->setUpdateStamp();
    }


    protected function formatDtoDate($dateValue,$format='F j, Y')
    {
        return TDateTime::format($dateValue,$format);
    }


    protected function lastUpdateAsString($format='F j, Y')
    {
        return $this->formatDtoDate($this->dateupdated,$format);
    }

    protected function convertDate($dateString) {
        try {
            $dateValue = empty($dateString) ? null : new \DateTime($dateString);
        }
        catch(\Exception $ex) {
            return false;
        }
        return $dateValue;
    }

    protected function convertDefaultDate($dateString) {
        if (empty($dateString)) {
            return new \DateTime();
        }
        $dateValue = $this->convertDate($dateString);
        return $dateValue;
    }
}