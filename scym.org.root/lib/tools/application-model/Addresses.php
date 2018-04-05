<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Addresses
 *
 * @Table(name="addresses")
 * @Entity
 */
class Addresses
{
    /**
     * @var integer
     *
     * @Column(name="addressID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $addressid;

    /**
     * @var integer
     *
     * @Column(name="addressType", type="integer", nullable=true)
     */
    private $addresstype = '1';

    /**
     * @var string
     *
     * @Column(name="addressName", type="string", length=50, nullable=true)
     */
    private $addressname;

    /**
     * @var string
     *
     * @Column(name="address1", type="string", length=50, nullable=true)
     */
    private $address1;

    /**
     * @var string
     *
     * @Column(name="address2", type="string", length=50, nullable=true)
     */
    private $address2;

    /**
     * @var string
     *
     * @Column(name="city", type="string", length=40, nullable=true)
     */
    private $city;

    /**
     * @var string
     *
     * @Column(name="state", type="string", length=2, nullable=true)
     */
    private $state;

    /**
     * @var string
     *
     * @Column(name="postalCode", type="string", length=20, nullable=true)
     */
    private $postalcode;

    /**
     * @var string
     *
     * @Column(name="country", type="string", length=25, nullable=true)
     */
    private $country;

    /**
     * @var string
     *
     * @Column(name="phone", type="string", length=25, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @Column(name="notes", type="string", length=200, nullable=true)
     */
    private $notes;

    /**
     * @var boolean
     *
     * @Column(name="newsletter", type="boolean", nullable=true)
     */
    private $newsletter;

    /**
     * @var boolean
     *
     * @Column(name="active", type="boolean", nullable=true)
     */
    private $active = '1';

    /**
     * @var string
     *
     * @Column(name="sortkey", type="string", length=80, nullable=true)
     */
    private $sortkey;

    /**
     * @var \DateTime
     *
     * @Column(name="dateAdded", type="datetime", nullable=true)
     */
    private $dateadded;

    /**
     * @var string
     *
     * @Column(name="addedBy", type="string", length=100, nullable=true)
     */
    private $addedby;

    /**
     * @var \DateTime
     *
     * @Column(name="dateUpdated", type="datetime", nullable=true)
     */
    private $dateupdated;

    /**
     * @var string
     *
     * @Column(name="updatedBy", type="string", length=100, nullable=true)
     */
    private $updatedby;


    /**
     * Get addressid
     *
     * @return integer 
     */
    public function getAddressid()
    {
        return $this->addressid;
    }

    /**
     * Set addresstype
     *
     * @param integer $addresstype
     * @return Addresses
     */
    public function setAddresstype($addresstype)
    {
        $this->addresstype = $addresstype;

        return $this;
    }

    /**
     * Get addresstype
     *
     * @return integer 
     */
    public function getAddresstype()
    {
        return $this->addresstype;
    }

    /**
     * Set addressname
     *
     * @param string $addressname
     * @return Addresses
     */
    public function setAddressname($addressname)
    {
        $this->addressname = $addressname;

        return $this;
    }

    /**
     * Get addressname
     *
     * @return string 
     */
    public function getAddressname()
    {
        return $this->addressname;
    }

    /**
     * Set address1
     *
     * @param string $address1
     * @return Addresses
     */
    public function setAddress1($address1)
    {
        $this->address1 = $address1;

        return $this;
    }

    /**
     * Get address1
     *
     * @return string 
     */
    public function getAddress1()
    {
        return $this->address1;
    }

    /**
     * Set address2
     *
     * @param string $address2
     * @return Addresses
     */
    public function setAddress2($address2)
    {
        $this->address2 = $address2;

        return $this;
    }

    /**
     * Get address2
     *
     * @return string 
     */
    public function getAddress2()
    {
        return $this->address2;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return Addresses
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set state
     *
     * @param string $state
     * @return Addresses
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set postalcode
     *
     * @param string $postalcode
     * @return Addresses
     */
    public function setPostalcode($postalcode)
    {
        $this->postalcode = $postalcode;

        return $this;
    }

    /**
     * Get postalcode
     *
     * @return string 
     */
    public function getPostalcode()
    {
        return $this->postalcode;
    }

    /**
     * Set country
     *
     * @param string $country
     * @return Addresses
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Addresses
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return Addresses
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * Get notes
     *
     * @return string 
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * Set newsletter
     *
     * @param boolean $newsletter
     * @return Addresses
     */
    public function setNewsletter($newsletter)
    {
        $this->newsletter = $newsletter;

        return $this;
    }

    /**
     * Get newsletter
     *
     * @return boolean 
     */
    public function getNewsletter()
    {
        return $this->newsletter;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return Addresses
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set sortkey
     *
     * @param string $sortkey
     * @return Addresses
     */
    public function setSortkey($sortkey)
    {
        $this->sortkey = $sortkey;

        return $this;
    }

    /**
     * Get sortkey
     *
     * @return string 
     */
    public function getSortkey()
    {
        return $this->sortkey;
    }

    /**
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return Addresses
     */
    public function setDateadded($dateadded)
    {
        $this->dateadded = $dateadded;

        return $this;
    }

    /**
     * Get dateadded
     *
     * @return \DateTime 
     */
    public function getDateadded()
    {
        return $this->dateadded;
    }

    /**
     * Set addedby
     *
     * @param string $addedby
     * @return Addresses
     */
    public function setAddedby($addedby)
    {
        $this->addedby = $addedby;

        return $this;
    }

    /**
     * Get addedby
     *
     * @return string 
     */
    public function getAddedby()
    {
        return $this->addedby;
    }

    /**
     * Set dateupdated
     *
     * @param \DateTime $dateupdated
     * @return Addresses
     */
    public function setDateupdated($dateupdated)
    {
        $this->dateupdated = $dateupdated;

        return $this;
    }

    /**
     * Get dateupdated
     *
     * @return \DateTime 
     */
    public function getDateupdated()
    {
        return $this->dateupdated;
    }

    /**
     * Set updatedby
     *
     * @param string $updatedby
     * @return Addresses
     */
    public function setUpdatedby($updatedby)
    {
        $this->updatedby = $updatedby;

        return $this;
    }

    /**
     * Get updatedby
     *
     * @return string 
     */
    public function getUpdatedby()
    {
        return $this->updatedby;
    }
    /**
     * @var integer
     *
     * @Column(name="directoryListingTypeId", type="integer", nullable=true)
     */
    private $directorylistingtypeid = '1';


    /**
     * Set directorylistingtypeid
     *
     * @param integer $directorylistingtypeid
     * @return Addresses
     */
    public function setDirectorylistingtypeid($directorylistingtypeid)
    {
        $this->directorylistingtypeid = $directorylistingtypeid;

        return $this;
    }

    /**
     * Get directorylistingtypeid
     *
     * @return integer 
     */
    public function getDirectorylistingtypeid()
    {
        return $this->directorylistingtypeid;
    }
}
