<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Authorizations
 *
 * @Table(name="authorizations")
 * @Entity
 */
class Authorizations
{
    /**
     * @var string
     *
     * @Column(name="username", type="string", length=40, nullable=false)
     * @Id
     * @GeneratedValue(strategy="NONE")
     */
    private $username = '';

    /**
     * @var string
     *
     * @Column(name="authCode", type="string", length=20, nullable=false)
     * @Id
     * @GeneratedValue(strategy="NONE")
     */
    private $authcode = '';


    /**
     * Set username
     *
     * @param string $username
     * @return Authorizations
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set authcode
     *
     * @param string $authcode
     * @return Authorizations
     */
    public function setAuthcode($authcode)
    {
        $this->authcode = $authcode;

        return $this;
    }

    /**
     * Get authcode
     *
     * @return string 
     */
    public function getAuthcode()
    {
        return $this->authcode;
    }
}
