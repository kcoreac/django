/* global QUnit, MapWidget */
/* eslint global-strict: 0, strict: 0 */
'use strict';

QUnit.module('gis.OLMapWidget');

QUnit.test('MapWidget.featureAdded', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(widget.layers.vector.features.length, 1);
    assert.equal(
        widget.layers.vector.features[0].geometry.toString(),
        'POINT(7.8177 47.397)',
        'Point addded to vector layer'
    );
});

QUnit.test('MapWidget.map_srid', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(widget.options.map_srid, 4326, 'SRID 4326');
});

QUnit.test('MapWidget.defaultCenter', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(widget.defaultCenter().toString(), 'lon=0,lat=0', 'Default center at 0, 0');
    options.default_lat = 47.08;
    options.default_lon = 6.81;
    widget = new MapWidget(options);
    assert.equal(
        widget.defaultCenter().toString(),
        'lon=6.81,lat=47.08',
        'Default center at 6.81, 47.08'
    );
});

QUnit.test('MapWidget.getControls', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    widget.getControls(widget.layers.vector);
    assert.equal(widget.controls.length, 3);
    assert.equal(widget.controls[0].displayClass, 'olControlNavigation', 'Navigation control');
    assert.equal(widget.controls[1].displayClass, 'olControlDrawFeaturePoint', 'Draw control');
    assert.equal(widget.controls[2].displayClass, 'olControlModifyFeature', 'Modify control');
});

QUnit.test('MapWidget.IsCollection', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.notOk(widget.options.is_collection);
    // Empty the default initial Point
    document.getElementById('id_point').value = "";

    options.geom_name = 'Polygon';
    widget = new MapWidget(options);
    assert.notOk(widget.options.is_collection);

    options.geom_name = 'LineString';
    widget = new MapWidget(options);
    assert.notOk(widget.options.is_collection);

    options.geom_name = 'MultiPoint';
    widget = new MapWidget(options);
    assert.ok(widget.options.is_collection);

    options.geom_name = 'MultiPolygon';
    widget = new MapWidget(options);
    assert.ok(widget.options.is_collection);

    options.geom_name = 'MultiLineString';
    widget = new MapWidget(options);
    assert.ok(widget.options.is_collection);

    options.geom_name = 'GeometryCollection';
    widget = new MapWidget(options);
    assert.ok(widget.options.is_collection);
});
