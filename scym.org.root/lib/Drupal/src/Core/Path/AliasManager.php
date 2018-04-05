<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 4/9/2015
 * Time: 5:27 AM
 */

namespace Drupal\Core\Path;


class AliasManager  implements AliasManagerInterface {

    /**
     * Given the alias, return the path it represents.
     *
     * @param string $alias
     *   An alias.
     * @param string $langcode
     *   An optional language code to look up the path in.
     *
     * @return string
     *   The path represented by alias, or the alias if no path was found.
     */
    public function getPathByAlias($alias, $langcode = NULL)
    {
        // TODO: Implement getPathByAlias() method.


    }

    /**
     * Given a path, return the alias.
     *
     * @param string $path
     *   A path.
     * @param string $langcode
     *   An optional language code to look up the path in.
     *
     * @return string
     *   An alias that represents the path, or path if no alias was found.
     */
    public function getAliasByPath($path, $langcode = NULL)
    {
        return drupal_get_path_alias($path);
    }

    /**
     * Clear internal caches in alias manager.
     *
     * @param $source
     *   Source path of the alias that is being inserted/updated. Can be omitted
     *   if entire cache needs to be flushed.
     */
    public function cacheClear($source = NULL)
    {
        // not supported in Drupal 7
    }
}