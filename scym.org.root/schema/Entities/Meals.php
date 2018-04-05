<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Meals
 *
 * @Table(name="meals")
 * @Entity
 */
class Meals
{
    /**
     * @var integer
     *
     * @Column(name="mealID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $mealid;

    /**
     * @var integer
     *
     * @Column(name="attenderID", type="integer", nullable=false)
     */
    private $attenderid = '0';

    /**
     * @var boolean
     *
     * @Column(name="mealTime", type="boolean", nullable=false)
     */
    private $mealtime = '0';

    /**
     * @var boolean
     *
     * @Column(name="vegetarian", type="boolean", nullable=false)
     */
    private $vegetarian = '0';


    /**
     * Get mealid
     *
     * @return integer 
     */
    public function getMealid()
    {
        return $this->mealid;
    }

    /**
     * Set attenderid
     *
     * @param integer $attenderid
     * @return Meals
     */
    public function setAttenderid($attenderid)
    {
        $this->attenderid = $attenderid;

        return $this;
    }

    /**
     * Get attenderid
     *
     * @return integer 
     */
    public function getAttenderid()
    {
        return $this->attenderid;
    }

    /**
     * Set mealtime
     *
     * @param boolean $mealtime
     * @return Meals
     */
    public function setMealtime($mealtime)
    {
        $this->mealtime = $mealtime;

        return $this;
    }

    /**
     * Get mealtime
     *
     * @return boolean 
     */
    public function getMealtime()
    {
        return $this->mealtime;
    }

    /**
     * Set vegetarian
     *
     * @param boolean $vegetarian
     * @return Meals
     */
    public function setVegetarian($vegetarian)
    {
        $this->vegetarian = $vegetarian;

        return $this;
    }

    /**
     * Get vegetarian
     *
     * @return boolean 
     */
    public function getVegetarian()
    {
        return $this->vegetarian;
    }
}
