// priority: 0

JEIEvents.information((event) => {
  //// Misc
  event.addItem(
    [
      "aether_redux:veridium_ore",
      "aether_redux:raw_veridium",
      "aether_redux:veridium_ingot",
    ],
    ["在天境頂部生成（y=155以上）"],
  );
  //// NPC items
  // Arms Dealer
  event.addItem(
    [
      "gunswithoutroses:bullet_bag",
      "gunswithoutroses:flint_bullet",
      "archers:auto_fire_hook",
      "confluence:magic_quiver",
      "gwrexpansions:netherite_sniper",
      "gwrexpansions:netherite_shotgun",
      "gwrexpansions:netherite_gatling",
      "sweet_charm_o_mine:gunpowder_bag",
    ],
    ["由軍火商NPC販售"],
  );

  // Merchant
  event.addItem(
    [
      "farmersdelight:rope",
      "numismatic-overhaul:piggy_bank",
      "dummmmmmy:target_dummy",
      "minecraft:phantom_membrane",
      "prodigium_reforged:compass_of_time",
    ],
    ["由商人NPC販售"],
  );

  // Tavernkeep
  event.addItem(
    [
      "prodigium:eternia_crystal",
      "naturescompass:naturescompass",
      "explorerscompass:explorerscompass",
      "waystones:waystone",
      "waystones:sandy_waystone",
      "irons_spellbooks:legendary_ink",
      "simplyskills:skill_chronicle",
      "simplyskills:malevolent_manuscript",
      "drinkbeer:recipe_board_package",
    ],
    ["由酒館老闆NPC販售"],
  );

  // Nurse
  event.addItem(
    [
      "ennemyexpansion:healing_eye",
      "confluence:band_of_regeneration",
      "confluence:cross_necklace",
    ],
    ["由護士NPC販售"],
  );

  // Zoologist
  event.addItem(
    [
      "domesticationinnovation:collar_tag",
      "companions:book_ice_shard",
      "companions:book_ice_tornado",
      "companions:book_fire_mark",
      "companions:book_brace",
      "companions:book_heal_ring",
      "companions:book_stone_spikes",
      "companions:book_magic_ray",
      "companions:book_black_hole",
      "companions:book_naginata",
    ],
    ["由動物學家NPC販售"],
  );

  // Goblin
  event.addItem(
    [
      "davespotioneering:potion_injector",
      "extractinator:extractinator",
      "aether:ambrosium_shard",
      "confluence:workshop",
      "confluence:dps_meter",
      "minecraft:firework_rocket",
    ],
    ["由哥布林工匠NPC販售"],
  );

  // Wizard
  event.addItem(
    [
      "irons_spellbooks:blank_rune",
      "irons_spellbooks:silver_ring",
      "irons_spellbooks:cooldown_ring",
      "irons_spellbooks:cast_time_ring",
      "irons_spellbooks:common_ink",
      "irons_spellbooks:uncommon_ink",
      "irons_spellbooks:rare_ink",
      "irons_spellbooks:epic_ink",
    ],
    ["由巫師NPC販售"],
  );

  // Steampunker
  event.addItem(
    [
      "toms_storage:ts.inventory_connector",
      "toms_storage:ts.trim",
      "toms_storage:ts.crafting_terminal",
      "toms_storage:ts.inventory_cable",
      "toms_storage:ts.inventory_cable_framed",
      "toms_storage:ts.inventory_cable_connector_framed",
      "toms_storage:ts.inventory_cable_connector",
      "toms_storage:ts.inventory_cable_connector_filtered",
      "toms_storage:ts.item_filter",
      "toms_storage:ts.item_filter",
      "toms_storage:ts.polymorphic_item_filter",
      "toms_storage:ts.tag_item_filter",
      "toms_storage:ts.inventory_hopper_basic",
      "toms_storage:ts.level_emitter",
      "toms_storage:ts.paint_kit",
      "sophisticatedstorage:stack_upgrade_tier_4",
      "sophisticatedbackpacks:stack_upgrade_tier_4",
    ],
    ["由蒸汽龐克人NPC販售"],
  );
});
