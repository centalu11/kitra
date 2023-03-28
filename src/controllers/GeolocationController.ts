import { Request, Response, NextFunction } from "express";
import dataSource from "../data-source";

export class GeolocationController {
  static findTreasureBox = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const params = req.query;
    const prizeValue = params.prize_value || 10;
    const earthKMRadius = 6371;

    const queryRunner = dataSource.createQueryRunner();
    const treasures = await queryRunner.manager.query(
      `
      SELECT
        treasures.*,
        ACOS(
          SIN(RADIANS(?)) *
          SIN(RADIANS(latitude)) +
          COS(RADIANS(?)) *
          COS(RADIANS(latitude)) *
          COS(
            RADIANS(longitude) -
            RADIANS(?)
          )
        ) * ? AS distance,
        MIN(money_values.amt) AS amount
      FROM treasures
      INNER JOIN money_values ON treasures.id = money_values.treasure_id
      WHERE money_values.amt >= ?
      GROUP BY treasures.id
      HAVING distance <= ?
      ORDER BY distance
    `,
      [
        params.latitude,
        params.latitude,
        params.longitude,
        earthKMRadius,
        prizeValue,
        params.distance,
      ]
    );

    return res.status(200).send(treasures);
  };
}
