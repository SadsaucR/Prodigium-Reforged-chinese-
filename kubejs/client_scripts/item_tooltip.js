ItemEvents.tooltip((event) => {
  // Curios
  event.add("prodigium_reforged:meat_charm", [
    Text.gold("被攻擊時有機率使攻擊者流血"),
  ]);

  event.add("prodigium_reforged:meat_shield", [
    Text.gold("被攻擊時有機率使攻擊者流血"),
  ]);

  event.add("prodigium_reforged:feather_necklace", [
    Text.gold("施放法術後有機率獲得神聖觸碰效果"),
  ]);

  //Misc
  event.add("prodigium_reforged:compass_of_time", [
    Text.darkAqua(
      "在Boss結構中右鍵以查看其重生狀態",
    ),
  ]);
  event.add("prodigium_reforged:wroughtnaut_plate", [
    Text.gold("可用於重鑄任意物品"),
  ]);

  event.add("kybejs:ancient_cobalt_bow", [Text.gold("無限箭矢")]);

  // Bows
  event.add("kubejs:arcanethyst_bow", [Text.gold("射出兩支魔法箭")]);
  event.add("kubejs:twin_shadows", [Text.gold("額外射出一支箭")]);
  event.add("kubejs:ancient_cobalt_bow", [Text.gold("附帶無限附魔")]);
  event.add("kubejs:frostmaw_howl", [
    Text.gold("冰緩並穿透最多2個目標"),
  ]);
  event.add("kubejs:aether_wind", [
    Text.gold("擊中方塊時召喚閃電，穿透1個目標"),
  ]);
  event.add("kubejs:void_petal", [
    Text.gold(
      "命中時獲得吸收效果，有機率給予荊棘詛咒，額外+1支箭",
    ),
  ]);
});
