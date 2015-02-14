angular.module('app')
	.service ('AlbumService', function () {
		var keys = {
			'w' : false,
			's' : false,
			'a' : false,
			'd' : false
		};
		/**
		 * @author alteredq / http://alteredqualia.com/
		 *
		 * Unpack RGBA depth shader
		 * - show RGBA encoded depth as monochrome color
		 */

		THREE.UnpackDepthRGBAShader = {

			uniforms: {

				"tDiffuse": { type: "t", value: null },
				"opacity":  { type: "f", value: 1.0 }

			},

			vertexShader: [

				"varying vec2 vUv;",

				"void main() {",

					"vUv = uv;",
					"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				"}"

			].join("\n"),

			fragmentShader: [

				"uniform float opacity;",

				"uniform sampler2D tDiffuse;",

				"varying vec2 vUv;",

				// RGBA depth

				"float unpackDepth( const in vec4 rgba_depth ) {",

					"const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );",
					"float depth = dot( rgba_depth, bit_shift );",
					"return depth;",

				"}",

				"void main() {",

					"float depth = 1.0 - unpackDepth( texture2D( tDiffuse, vUv ) );",
					"gl_FragColor = opacity * vec4( vec3( depth ), 1.0 );",

				"}"

			].join("\n")

		};

		function init() {
			var window_width = window.innerWidth;
			var window_height = window.innerHeight;
			var container = $('#album');
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window_width/window_height, 0.1, 1000 );
				camera.position.z = 1000;
				
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window_width, window_height);
			renderer.shadowMapEnabled = true;
			container.append( renderer.domElement );


			var light = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
			scene.add( light );

			var group = new THREE.Group();
			for (var i = 0; i < 7; i ++) {
				var map = THREE.ImageUtils.loadTexture( "images/photo" + (i + 1) + ".jpg" );
				var material = new THREE.MeshPhongMaterial( { map: map, color: 0xffffff} );
				var geometry = new THREE.BoxGeometry( 100, 100, 1 );
				var mesh = new THREE.Mesh( geometry, material );

				switch (i) {
					case 0:
						mesh.position.x = 0;
						mesh.position.z = -30;
						mesh.rotation.y = 0;
						break;
					case 1:
						mesh.position.x = 180;
						mesh.position.z = 100;
						mesh.rotation.y = - Math.PI / 2;
						break;
					case 2:
						mesh.position.x = 180;
						mesh.position.z = 260;
						mesh.rotation.y = - Math.PI / 2;
						break;
					case 3:
						mesh.position.x = 180;
						mesh.position.z = 400;
						mesh.rotation.y = - Math.PI / 2;
						break;
					case 4:
						mesh.position.x = -180;
						mesh.position.z = 260;
						mesh.rotation.y = Math.PI / 2;
						break;
					case 5:
						mesh.position.x = -180;
						mesh.position.z = 100;
						mesh.rotation.y = Math.PI / 2;
						break;
					case 6:
						mesh.position.x = -180;
						mesh.position.z = 400;
						mesh.rotation.y = Math.PI / 2;
						break;
				}

				group.add(mesh);

				mesh.updateMatrix();

				var holder_body = new THREE.Mesh( 
					new THREE.BoxGeometry( 5, 40, 1 ),
					new THREE.MeshPhongMaterial( { color: 0x000000} )
					);
				
				holder_body.applyMatrix(mesh.matrix);
				holder_body.translateY(-70);

				var holder_bot = new THREE.Mesh( 
					new THREE.BoxGeometry( 10, 5, 1 ),
					new THREE.MeshPhongMaterial( { color: 0x000000} )
					);
				
				holder_bot.applyMatrix(mesh.matrix);
				holder_bot.translateY(-92.5);

				group.add(holder_body);
				group.add(holder_bot);
			}

			var wall = new THREE.Mesh( 
				new THREE.PlaneBufferGeometry( 2000, 2000 ),
				new THREE.MeshPhongMaterial( { color: 0xFF4719} )
			);
			wall.position.set(0, 0, -50);
			group.add(wall);

			wall = new THREE.Mesh( 
				new THREE.PlaneBufferGeometry( 2000, 2000 ),
				new THREE.MeshPhongMaterial( { color: 0xFF3399} )
			);
			wall.position.set(-200, 0, 100);
			wall.rotation.y = Math.PI / 2;
			group.add(wall);

			wall = new THREE.Mesh( 
				new THREE.PlaneBufferGeometry( 2000, 2000 ),
				new THREE.MeshPhongMaterial( { color: 0x0099CC} )
			);
			wall.position.set(200, 0, 100);
			wall.rotation.y = -Math.PI / 2;
			group.add(wall);

			var background_img = THREE.ImageUtils.loadTexture( "images/wall.jpg" );
			var background = new THREE.Mesh( 
				new THREE.PlaneBufferGeometry( 400, 300 ),
				new THREE.MeshPhongMaterial( { map: background_img} )
			);
			background.position.set(0, 220, -49);
			group.add(background);

			var ground = new THREE.Mesh( 
				new THREE.PlaneBufferGeometry( 2000, 2000 ),
				new THREE.MeshPhongMaterial( { color: 0x5CE62E} )
			);

			ground.position.set(0, -100, 0);
			ground.rotation.x = -Math.PI / 2;
			group.add(ground);

			scene.add( group );

			var start = function () {
				var requestId = requestAnimationFrame( start );
				camera.translateZ(-15);
				light.position.set(camera.position.x, camera.position.y, camera.position.z);
				renderer.render(scene, camera);
				if (camera.position.z <= 150) {
					cancelAnimationFrame( requestId );
					render();
					assignMouseEvent();
					assignKeyboardEvent();
				}
			};


			var render = function () {
				requestAnimationFrame( render );
				keyControl();
				light.position.set(camera.position.x, camera.position.y, camera.position.z);
				// controls.update();
				renderer.render(scene, camera);
			};
			
			var assignMouseEvent = function () {
				var x, y;
				container
				.on('mousedown', function (event) {
					x = event.pageX;
					y = event.pageY;
					container.on('mousemove', function (event) {
						camera.rotateY(-0.003 * (event.pageX - x));
						// camera.rotateX(0.001 * (event.pageY - y));
						x = event.pageX;
						y = event.pageY;
					});
				})
				.on('mouseup', function (event) {
					container.off('mousemove');
				});
			};

			var assignKeyboardEvent = function () {
				$(document).on('keydown', function (e) {
					switch (e.which) {
						case 87:
							keys.w = true;
							break;
						case 83:
							keys.s = true;
							break;
						case 65:
							keys.a = true;
							break;
						case 68:
							keys.d = true;
							break;
					}
				})
				.on('keyup', function (e) {
					switch (e.which) {
						case 87:
							keys.w = false;
							break;
						case 83:
							keys.s = false;
							break;
						case 65:
							keys.a = false;
							break;
						case 68:
							keys.d = false;
							break;
					}
				});
			};

			var keyControl = function () {
				if (camera.position.x < -190) {
					camera.position.x = -190;
					return;
				}
				if (camera.position.x > 190) {
					camera.position.x = 190;
					return;
				}
				if (camera.position.z < -40) {
					camera.position.z = -40;
					return;
				}
				if (camera.position.z > 990) {
					camera.position.z = 990;
					return;
				}
				if (keys.w) {
					camera.translateZ(-5);
				}
				if (keys.s) {
					camera.translateZ(5);
				}
				if (keys.a) {
					camera.translateX(-5);
				}
				if (keys.d) {
					camera.translateX(5);
				}
			};

			start();
		}

		return {init : init};
	});