<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Housingunits
 *
 * @Table(name="housingunits")
 * @Entity
 */
class Housingunits
{
    /**
     * @var string
     *
     * @Column(name="unitname", type="string", length=10, nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $unitname = '';

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=100, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @Column(name="capacity", type="integer", nullable=true)
     */
    private $capacity;

    /**
     * @var string
     *
     * @Column(name="housingTypeCode", type="string", length=20, nullable=true)
     */
    private $housingtypecode;


    /**
     * Get unitname
     *
     * @return string 
     */
    public function getUnitname()
    {
        return $this->unitname;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Housingunits
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set capacity
     *
     * @param integer $capacity
     * @return Housingunits
     */
    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * Get capacity
     *
     * @return integer 
     */
    public function getCapacity()
    {
        return $this->capacity;
    }

    /**
     * Set housingtypecode
     *
     * @param string $housingtypecode
     * @return Housingunits
     */
    public function setHousingtypecode($housingtypecode)
    {
        $this->housingtypecode = $housingtypecode;

        return $this;
    }

    /**
     * Get housingtypecode
     *
     * @return string 
     */
    public function getHousingtypecode()
    {
        return $this->housingtypecode;
    }
}
