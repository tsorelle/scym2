<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Mailboxes
 *
 * @Table(name="mailboxes", uniqueConstraints={@UniqueConstraint(name="boxIndex", columns={"box"})})
 * @Entity
 */
class Mailboxes
{
    /**
     * @var integer
     *
     * @Column(name="boxId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $boxid;

    /**
     * @var string
     *
     * @Column(name="box", type="string", length=30, nullable=false)
     */
    private $box = '';

    /**
     * @var string
     *
     * @Column(name="address", type="string", length=100, nullable=true)
     */
    private $address;

    /**
     * @var string
     *
     * @Column(name="displayText", type="string", length=100, nullable=true)
     */
    private $displaytext;


    /**
     * Get boxid
     *
     * @return integer 
     */
    public function getBoxid()
    {
        return $this->boxid;
    }

    /**
     * Set box
     *
     * @param string $box
     * @return Mailboxes
     */
    public function setBox($box)
    {
        $this->box = $box;

        return $this;
    }

    /**
     * Get box
     *
     * @return string 
     */
    public function getBox()
    {
        return $this->box;
    }

    /**
     * Set address
     *
     * @param string $address
     * @return Mailboxes
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set displaytext
     *
     * @param string $displaytext
     * @return Mailboxes
     */
    public function setDisplaytext($displaytext)
    {
        $this->displaytext = $displaytext;

        return $this;
    }

    /**
     * Get displaytext
     *
     * @return string 
     */
    public function getDisplaytext()
    {
        return $this->displaytext;
    }
}
