<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Organizations
 *
 * @Table(name="organizations")
 * @Entity
 */
class Organizations
{
    /**
     * @var integer
     *
     * @Column(name="organizationId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $organizationid;

    /**
     * @var string
     *
     * @Column(name="organizationName", type="string", length=80, nullable=false)
     */
    private $organizationname = '';

    /**
     * @var integer
     *
     * @Column(name="description", type="integer", nullable=false)
     */
    private $description = '0';

    /**
     * @var string
     *
     * @Column(name="phone", type="string", length=20, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @Column(name="email", type="string", length=30, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @Column(name="webURL", type="string", length=30, nullable=true)
     */
    private $weburl;

    /**
     * @var string
     *
     * @Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var integer
     *
     * @Column(name="addressID", type="integer", nullable=false)
     */
    private $addressid = '0';

    /**
     * @var integer
     *
     * @Column(name="organizationTypeId", type="integer", nullable=false)
     */
    private $organizationtypeid = '0';

    /**
     * @var string
     *
     * @Column(name="organizationIdCode", type="string", length=20, nullable=true)
     */
    private $organizationidcode;


    /**
     * Get organizationid
     *
     * @return integer 
     */
    public function getOrganizationid()
    {
        return $this->organizationid;
    }

    /**
     * Set organizationname
     *
     * @param string $organizationname
     * @return Organizations
     */
    public function setOrganizationname($organizationname)
    {
        $this->organizationname = $organizationname;

        return $this;
    }

    /**
     * Get organizationname
     *
     * @return string 
     */
    public function getOrganizationname()
    {
        return $this->organizationname;
    }

    /**
     * Set description
     *
     * @param integer $description
     * @return Organizations
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return integer 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Organizations
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
     * Set email
     *
     * @param string $email
     * @return Organizations
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set weburl
     *
     * @param string $weburl
     * @return Organizations
     */
    public function setWeburl($weburl)
    {
        $this->weburl = $weburl;

        return $this;
    }

    /**
     * Get weburl
     *
     * @return string 
     */
    public function getWeburl()
    {
        return $this->weburl;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return Organizations
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
     * Set addressid
     *
     * @param integer $addressid
     * @return Organizations
     */
    public function setAddressid($addressid)
    {
        $this->addressid = $addressid;

        return $this;
    }

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
     * Set organizationtypeid
     *
     * @param integer $organizationtypeid
     * @return Organizations
     */
    public function setOrganizationtypeid($organizationtypeid)
    {
        $this->organizationtypeid = $organizationtypeid;

        return $this;
    }

    /**
     * Get organizationtypeid
     *
     * @return integer 
     */
    public function getOrganizationtypeid()
    {
        return $this->organizationtypeid;
    }

    /**
     * Set organizationidcode
     *
     * @param string $organizationidcode
     * @return Organizations
     */
    public function setOrganizationidcode($organizationidcode)
    {
        $this->organizationidcode = $organizationidcode;

        return $this;
    }

    /**
     * Get organizationidcode
     *
     * @return string 
     */
    public function getOrganizationidcode()
    {
        return $this->organizationidcode;
    }
}
