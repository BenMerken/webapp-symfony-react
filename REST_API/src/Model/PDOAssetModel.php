<?php


namespace App\Model;


use InvalidArgumentException;
use PDO;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PDOAssetModel implements AssetModel
{
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function getAssetsForRoomId($roomId)
    {
        $pdo = $this->connection->getPDO();
        $query = "SELECT * FROM assets WHERE roomId = :roomId;";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":roomId", $roomId, PDO::PARAM_INT);
        $statement->bindColumn(1, $id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $room, \PDO::PARAM_INT);
        $statement->bindColumn(3, $name, \PDO::PARAM_STR);
        $statement->execute();

        $assets = [];
        while ($statement->fetch(\PDO::FETCH_BOUND)) {
            $asset = [
                'id' => $id,
                'roomId' => $room,
                'name' => $name
            ];
            $assets[] = $asset;
        }
        return $assets;
    }

    public function getIdForName($name)
    {
        $this->validateName($name);

        $pdo = $this->connection->getPDO();
        $query = "SELECT id FROM assets WHERE name = :name;";
        $statement = $pdo->prepare($query);
        $statement->bindParam(":name", $name, PDO::PARAM_STR);
        $statement->bindColumn(1, $id, PDO::PARAM_INT);
        $statement->execute();
        $statement->fetch(PDO::FETCH_BOUND);
        if (!$id) {
            throw new NotFoundHttpException("No asset found for name = $name.");
        }

        return $id;
    }

    public function validateName($name)
    {
        if (!(is_string($name) && strlen($name) <= 45 && strlen($name) >= 5)) {
            throw new InvalidArgumentException("The name must be a string no longer than 45 characters and no less than 5");
        }
    }
}