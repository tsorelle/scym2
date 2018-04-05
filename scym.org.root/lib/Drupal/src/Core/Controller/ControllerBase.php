<?php

/**
 * @file
 * Contains \Drupal\Core\Controller\ControllerBase.
 */

namespace Drupal\Core\Controller;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
/*
 // these are not implemented for Drupal 7 yet
use Drupal\Core\Routing\LinkGeneratorTrait;
use Drupal\Core\Routing\UrlGeneratorTrait;
use Drupal\Core\StringTranslation\StringTranslationTrait;
*/
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Utility base class for thin controllers.
 *
 * Controllers that use this base class have access to a number of utility
 * methods and to the Container, which can greatly reduce boilerplate dependency
 * handling code.  However, it also makes the class considerably more
 * difficult to unit test. Therefore this base class should only be used by
 * controller classes that contain only trivial glue code.  Controllers that
 * contain sufficiently complex logic that it's worth testing should not use
 * this base class but use ContainerInjectionInterface instead, or even better be
 * refactored to be trivial glue code.
 *
 * The services exposed here are those that it is reasonable for a well-behaved
 * controller to leverage. A controller that needs other other services may
 * need to be refactored into a thin controller and a dependent unit-testable
 * service.
 *
 * @see \Drupal\Core\DependencyInjection\ContainerInjectionInterface
 *
 * @ingroup menu
 */
abstract class ControllerBase implements ContainerInjectionInterface {
    /*
// not impleemented for Drupal 7 yet
  use StringTranslationTrait;
  use LinkGeneratorTrait;
  use UrlGeneratorTrait;
     */

  /**
   * The entity manager.
   *
   * @var \Drupal\Core\Entity\EntityManagerInterface
   */
  protected $entityManager;

  /**
   * The entity form builder.
   *
   * @var \Drupal\Core\Entity\EntityFormBuilderInterface
   */
  protected $entityFormBuilder;

  /**
   * The language manager.
   *
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   */
  protected $languageManager;

  /**
   * The configuration factory.
   *
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   */
  protected $configFactory;

  /**
   * The key-value storage.
   *
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   */
  protected $keyValue;

  /**
   * The current user service.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * The state service.
   *
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   */
  protected $stateService;

  /**
   * The module handler.
   *
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   */
  protected $moduleHandler;

  /**
   * The form builder.
   *
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   */
  protected $formBuilder;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static();
  }

  /**
   * Retrieves the entity manager service.
   *
   * @return \Drupal\Core\Entity\EntityManagerInterface
   *   The entity manager service.
   */
  protected function entityManager() {
    if (!$this->entityManager) {
      $this->entityManager = $this->container()->get('entity.manager');
    }
    return $this->entityManager;
  }

  /**
   * Retrieves the entity form builder.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   *   The entity form builder.
   */
  protected function entityFormBuilder() {
    if (!$this->entityFormBuilder) {
      $this->entityFormBuilder = $this->container()->get('entity.form_builder');
    }
    return $this->entityFormBuilder;
  }

  /**
   * Returns the requested cache bin.
   *
   * @param string $bin
   *   (optional) The cache bin for which the cache object should be returned,
   *   defaults to 'default'.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   *
   *   The cache object associated with the specified bin.
   */
  protected function cache($bin = 'default') {
    return $this->container()->get('cache.' . $bin);
  }

  /**
   * Retrieves a configuration object.
   *
   * This is the main entry point to the configuration API. Calling
   * @code $this->config('book.admin') @endcode will return a configuration
   * object in which the book module can store its administrative settings.
   *
   * @param string $name
   *   The name of the configuration object to retrieve. The name corresponds to
   *   a configuration file. For @code \Drupal::config('book.admin') @endcode,
   *   the config object returned will contain the contents of book.admin
   *   configuration file.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   *   A configuration object.
   */
  protected function config($name) {
    if (!$this->configFactory) {
      $this->configFactory = $this->container()->get('config.factory');
    }
    return $this->configFactory->get($name);
  }

  /**
   * Returns a key/value storage collection.
   *
   * @param string $collection
   *   Name of the key/value collection to return.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   */
  protected function keyValue($collection) {
    if (!$this->keyValue) {
      $this->keyValue = $this->container()->get('keyvalue')->get($collection);
    }
    return $this->keyValue;
  }

  /**
   * Returns the state storage service.
   *
   * Use this to store machine-generated data, local to a specific environment
   * that does not need deploying and does not need human editing; for example,
   * the last time cron was run. Data which needs to be edited by humans and
   * needs to be the same across development, production, etc. environments
   * (for example, the system maintenance message) should use config() instead.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   */
  protected function state() {
    if (!$this->stateService) {
      $this->stateService = $this->container()->get('state');
    }
    return $this->stateService;
  }

  /**
   * Returns the module handler.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   */
  protected function moduleHandler() {
    if (!$this->moduleHandler) {
      $this->moduleHandler = $this->container()->get('module_handler');
    }
    return $this->moduleHandler;
  }

  /**
   * Returns the form builder service.
   *
   * NOT Implemented for Drupal 7 yet. See Drupal 8 version
   */
  protected function formBuilder() {
    if (!$this->formBuilder) {
      $this->formBuilder = $this->container()->get('form_builder');
    }
    return $this->formBuilder;
  }

  /**
   * Returns the current user.
   *
   * @return \Drupal\Core\Session\AccountInterface
   *   The current user.
   */
  protected function currentUser() {
    if (!$this->currentUser) {
      $this->currentUser = $this->container()->get('current_user');
    }
    return $this->currentUser;
  }

  /**
   * NOT IMPLEMENTED FOR Drupal 7 (yet) see Drupal 8 version
   * Returns the language manager service.
   */
  protected function languageManager() {
    if (!$this->languageManager) {
      $this->languageManager = $this->container()->get('language_manager');
    }
    return $this->languageManager;
  }

  /**
   * Returns the service container.
   *
   * This method is marked private to prevent sub-classes from retrieving
   * services from the container through it. Instead,
   * \Drupal\Core\DependencyInjection\ContainerInjectionInterface should be used
   * for injecting services.
   *
   * @return \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   The service container.
   */
  private function container() {
    return \Drupal::getContainer();
  }

}
