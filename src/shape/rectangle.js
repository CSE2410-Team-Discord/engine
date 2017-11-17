pc.extend(pc, function () {
	var tmpVecA = new pc.Vec3();

	/**
	 * @name pc.Rectangle
	 * @description Create a new axis-aligned rectangle.
	 * @class Axis-Aligned Rectangle.
	 * @param {pc.Vec3} [center] Center of Rectangle. The Constructor takes a reference of this parameter.
	 * @param {pc.Vec3} [halfExtents] Half the distance across the rectangle in each axis. The constructor takes a reference of this parameter.
	 */
	var Rectangle = function Rectangle(center, halfExtents) {
		this.cetner = center || new pc.Vec3(0, 0, 0);
		this.halfExtents = halfExtents || new pc.Vec3(0.5, 0.5, 0);
		this._min = new pc.Vec3();
		this._max = new pc.Vec3();
	};

	Rectangle.prototype = {

			/**
			 * @function
			 * @name pc.Rectangle#add
			 * @description Combines two rectangles into one, enclosing both. Only works for rectangles of the same dimensions AKA (x, y) + (x, y).
			 * @param {pc.Rectangle} other Rectangle to add.
			 */
			add: function (other) {
				var tc = this.center.data;
	            var tcx = tc[0];
	            var tcy = tc[1];
	            var tcz = tc[2];
	            var th = this.halfExtents.data;
	            var thx = th[0];
	            var thy = th[1];
	            var thz = th[2];

	            var oc = other.center.data;
	            var ocx = oc[0];
	            var ocy = oc[1];
	            var ocz = oc[2];
	            var oh = other.halfExtents.data;
	            var ohx = oh[0];
	            var ohy = oh[1];
	            var ohz = oh[2];
	            if((thx == 0)&&(ohx == 0)){
	            	var tminx = tcx - thx;
	                var tmaxx = tcx + thx;
	                var tminy = tcy - thy;
	                var tmaxy = tcy + thy;
	                var tminz = tcz - thz;
	                var tmaxz = tcz + thz;

	                var ominx = ocx - ohx;
	                var omaxx = ocx + ohx;
	                var ominy = ocy - ohy;
	                var omaxy = ocy + ohy;
	                var ominz = ocz - ohz;
	                var omaxz = ocz + ohz;

	                if (ominx < tminx) tminx = ominx;
	                if (omaxx > tmaxx) tmaxx = omaxx;
	                if (ominy < tminy) tminy = ominy;
	                if (omaxy > tmaxy) tmaxy = omaxy;
	                if (ominz < tminz) tminz = ominz;
	                if (omaxz > tmaxz) tmaxz = omaxz;

	                tc[0] = (tminx + tmaxx) * 0.5;
	                tc[1] = (tminy + tmaxy) * 0.5;
	                tc[2] = (tminz + tmaxz) * 0.5;
	                th[0] = 0;
	                th[1] = (tmaxy - tminy) * 0.5;
	                th[2] = (tmaxz - tminz) * 0.5;
	            } else if((thy == 0)&&(ohx == 0)) {
	            	var tminx = tcx - thx;
	                var tmaxx = tcx + thx;
	                var tminy = tcy - thy;
	                var tmaxy = tcy + thy;
	                var tminz = tcz - thz;
	                var tmaxz = tcz + thz;

	                var ominx = ocx - ohx;
	                var omaxx = ocx + ohx;
	                var ominy = ocy - ohy;
	                var omaxy = ocy + ohy;
	                var ominz = ocz - ohz;
	                var omaxz = ocz + ohz;

	                if (ominx < tminx) tminx = ominx;
	                if (omaxx > tmaxx) tmaxx = omaxx;
	                if (ominy < tminy) tminy = ominy;
	                if (omaxy > tmaxy) tmaxy = omaxy;
	                if (ominz < tminz) tminz = ominz;
	                if (omaxz > tmaxz) tmaxz = omaxz;

	                tc[0] = (tminx + tmaxx) * 0.5;
	                tc[1] = (tminy + tmaxy) * 0.5;
	                tc[2] = (tminz + tmaxz) * 0.5;
	                th[0] = (tmaxx - tminx) * 0.5;
	                th[1] = 0;
	                th[2] = (tmaxz - tminz) * 0.5;
	            } else if((thz == 0)&&(ohz == 0)) {
	            	var tminx = tcx - thx;
	                var tmaxx = tcx + thx;
	                var tminy = tcy - thy;
	                var tmaxy = tcy + thy;
	                var tminz = tcz - thz;
	                var tmaxz = tcz + thz;

	                var ominx = ocx - ohx;
	                var omaxx = ocx + ohx;
	                var ominy = ocy - ohy;
	                var omaxy = ocy + ohy;
	                var ominz = ocz - ohz;
	                var omaxz = ocz + ohz;

	                if (ominx < tminx) tminx = ominx;
	                if (omaxx > tmaxx) tmaxx = omaxx;
	                if (ominy < tminy) tminy = ominy;
	                if (omaxy > tmaxy) tmaxy = omaxy;
	                if (ominz < tminz) tminz = ominz;
	                if (omaxz > tmaxz) tmaxz = omaxz;

	                tc[0] = (tminx + tmaxx) * 0.5;
	                tc[1] = (tminy + tmaxy) * 0.5;
	                tc[2] = (tminz + tmaxz) * 0.5;
	                th[0] = (tmaxx - tminx) * 0.5;
	                th[1] = (tmaxy - tminy) * 0.5;
	                th[2] = 0;
	            }
			},

			copy: function (src) {
				this.center.copy(src.center);
				this.halfExtents.copy(src.halfExtents);
				this.type = src.type;
			},

			clone: function() {
				return new pc.Rectangle(this.center.clone(), this.halfExtents.clone());
			},

			/**
			 * @function MAY CHANGE DUE TO INTERACTION, NEED TO SEE WHAT MAX IS FIRST
			 * @name pc.Rectangle#intersects
			 * @description Test whether two axis-aligned rectangles intersect.
			 * @param {pc.Rectangle} other Rectangle to test against.
			 * @returns {Boolean} True if there is an intersection.
			 */
			intersects: function (other) {
				var aMax = this.getMax();
				var aMin = this.getMin();
				var bMax = other.getMax();
				var bMin = other.getMin();

				return (aMin.x <= bMax.x) && (aMax.x >= bMin.x) &&
                (aMin.y <= bMax.y) && (aMax.y >= bMin.y) &&
                (aMin.z <= bMax.z) && (aMax.z >= bMin.z);
			},

			_intersectsRay: function(ray, point) {
				
			},

			setMinMax: function(min, max) {
				this.center.add2(max, min).scale(0.5);
				this.halfExtents.sub2(max, min).scale(0.5);
			},

			/**
			 * @function
			 * @name pc.Rectangle#getMin
			 * @description Return the minimum corner of the AABB.
			 * @returns {pc.Vec3} minimum corner.
			 */
			getMin: function() {
				return this._min.copy(this.center).sub(this.halfExtents);
			},

			/**
			 * @function
			 * @name pc.Rectangle#getMax
			 * @description Return the maximum corner of the AABB.
			 * @returns {pc.Vec3} maximum corner.
			 */
			getMax: function() {
				return this._max.copy(this.center).add(this.halfExtents);
			},

			/**
			 * @function
			 * @name pc.Rectangle#containsPoint
			 * @description Test if a point is inside a AABB.
			 * @param {pc.Vec3} point Point to test.
			 * @returns {Boolean} true if the point is inside the AABB and false otherwise.
			 */
			containsPoint: function (point) {
				var min = this.getMin();
				var max = this.getMax();
				var i;

				for (i = 0; i < 3; ++i) {
					if (point.data[i] < min.data[i] || point.data[i] > ma.data[i])
						return false;
				}

				return true;
			},

			/**
			 * @function
			 * @name pc.Rectangle#intersectsBoundingSphere
			 * @description Test if a Bounding Sphere is overlapping or enveloping this AABB.
			 * @param {pc.BoundingSphere} sphere Bounding Sphere to test.
			 * @returns {Boolean} true if the Bounding Sphere is overlapping or enveloping and false otherwise.
			 */
			intersectsBoundingSphere: function(sphere) {
				
			}
	};

	return {
		Rectangle: Rectangle
	};
}());