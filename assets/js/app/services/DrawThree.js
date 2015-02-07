angular.module('app')
	.service ('AlbumService', function () {
		function init() {
			var window_width = window.innerWidth;
			var window_height = window.innerHeight;
			var container = $('#album');
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window_width/window_height, 0.1, 1000 );
				camera.position.z = 1000;
				
			var renderer = new THREE.WebGLRenderer({alpha: true});
			renderer.setSize(window_width, window_height);
			container.append( renderer.domElement );

			var light = new THREE.AmbientLight( 0xFFFFFF );
			scene.add( light );

			var group = new THREE.Group();
			for (var i = 0; i < 6; i ++) {
				var map = THREE.ImageUtils.loadTexture( "images/photo" + (i + 1) + ".jpg" );
				var material = new THREE.MeshPhongMaterial( { map: map, color: 0xffffff} );
				var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
				var mesh = new THREE.Mesh( geometry, material );

				switch (i) {
					case 0:
						mesh.position.x = 0;
						mesh.position.z = 0;
						mesh.rotation.y = 0;
						break;
					case 1:
						mesh.position.x = 150;
						mesh.position.z = 100;
						mesh.rotation.y = - Math.PI / 3;
						break;
					case 2:
						mesh.position.x = 150;
						mesh.position.z = 260;
						mesh.rotation.y = - 2 * Math.PI / 3;
						break;
					case 3:
						mesh.position.x = 0;
						mesh.position.z = 300;
						mesh.rotation.y = Math.PI;
						break;
					case 4:
						mesh.position.x = -150;
						mesh.position.z = 260;
						mesh.rotation.y = 2 * Math.PI / 3;
						break;
					case 5:
						mesh.position.x = -150;
						mesh.position.z = 100;
						mesh.rotation.y = Math.PI / 3;
						break;
				}
				

				group.add(mesh);

				mesh.updateMatrix();

				var holder_body = new THREE.Mesh( 
					new THREE.PlaneBufferGeometry( 5, 20 ),
					new THREE.MeshBasicMaterial( { color: 0x000000} )
					);
				
				holder_body.applyMatrix(mesh.matrix);
				holder_body.translateY(-60);

				var holder_bot = new THREE.Mesh( 
					new THREE.PlaneBufferGeometry( 10, 5 ),
					new THREE.MeshBasicMaterial( { color: 0x000000} )
					);
				
				holder_bot.applyMatrix(mesh.matrix);
				holder_bot.translateY(-72.5);

				group.add(holder_body);
				group.add(holder_bot);
			}
			

			scene.add( group );

			var start = function () {
				var requestId = requestAnimationFrame( start );
				camera.translateZ(-5);
				renderer.render(scene, camera);
				if (camera.position.z <= 150) {
					cancelAnimationFrame( requestId );
					render();
					assignMouseEvent();
				}
			};


			var render = function () {
				requestAnimationFrame( render );
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
						camera.rotateY(0.001 * (event.pageX - x));
						// camera.rotateX(0.001 * (event.pageY - y));
						x = event.pageX;
						y = event.pageY;
					});
				})
				.on('mouseup', function (event) {
					container.off('mousemove');
				});
			};

			start();
		}

		return {init : init};
	});